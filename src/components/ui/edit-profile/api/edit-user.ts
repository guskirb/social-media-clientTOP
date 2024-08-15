import { z } from "zod";
import { useMutation } from "@tanstack/react-query";

import axios from "../../../../lib/axios";
import { queryClient } from "../../../../lib/react-query";
import useAuthStore from "../../../../hooks/use-auth-store";

export const editUserSchema = z.object({
  name: z.string().min(1, { message: "Enter a name" }),
  bio: z.string(),
  profileImg: z.any(),
  coverImg: z.any(),
});

export type EditUserFormFields = z.infer<typeof editUserSchema>;

export const editUser = async (data: FormData) => {
  try {
    const response = await axios.post("/users/update", data);
    return response.data.user;
  } catch (error: any) {
    return error.response.data;
  }
};

export const useEditUser = () => {
  const authUser = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: (data: FormData) => editUser(data),
    onSuccess: (data) => {
      queryClient.setQueryData(["user", authUser!.username], (user: object) => {
        setUser({
          ...authUser!,
          name: data.name,
          profileImg: data.profileImg,
        });
        return {
          ...user,
          name: data.name,
          bio: data.bio,
          profileImg: data.profileImg,
          coverImg: data.coverImg,
        };
      });
    },
  });
};
