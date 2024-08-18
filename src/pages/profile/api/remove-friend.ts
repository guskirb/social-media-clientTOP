import { InfiniteData, QueryFilters, useMutation } from "@tanstack/react-query";

import axios from "../../../lib/axios";
import { queryClient } from "../../../lib/react-query";
import useAuthStore from "../../../hooks/use-auth-store";
import { Page } from "../../../types/types";

export const removeFriend = async (id: string) => {
  try {
    const response = await axios.post(`/users/${id}/remove`);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const useRemoveFriend = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const user = useAuthStore((state) => state.user);
  return useMutation({
    mutationFn: (id: string) => removeFriend(id),
    onSuccess: async (data) => {
      setUser({
        ...user!,
        friends: user!.friends.filter((friend) => friend !== data.id),
      });

      const queryFilter: QueryFilters = { queryKey: ["posts"] };
      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<Page, string | null>>(
        queryFilter,
        (oldData) => {
          if (!oldData) return;

          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) => ({
              nextPage: page.nextPage,
              posts: page.posts.filter((post) => post.author!.id !== data.id),
            })),
          };
        }
      );
    },
  });
};
