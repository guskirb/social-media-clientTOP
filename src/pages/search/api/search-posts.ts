import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";

import axios from "../../../lib/axios";

export const getSearchPostsQueryOptions = (search: string) => {
  return infiniteQueryOptions({
    queryKey: ["posts", "search", search],
    queryFn: ({ pageParam = 1 }) => getSearchPosts({ search, pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
  });
};

export const getSearchPosts = async ({
  search,
  pageParam,
}: {
  search: string;
  pageParam: any;
}) => {
  try {
    const response = await axios.get(
      `/posts?page=${pageParam}&limit=10&search=${search}`
    );
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const useSearchPosts = (search: string) => {
  return useInfiniteQuery({ ...getSearchPostsQueryOptions(search) });
};
