import Head from "../../../components/seo/head";
import { useParams, LoaderFunctionArgs } from "react-router-dom";
import {
  getUserQueryOptions,
  useUser,
} from "../../../pages/profile/api/get-user";
import Profile from "../../../pages/profile/profile";
import { QueryClient } from "@tanstack/react-query";

export const userLoader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const username = params.username as string;
    const userQuery = getUserQueryOptions(username);

    const user =
      queryClient.getQueryData(userQuery.queryKey) ??
      (await queryClient.fetchQuery(userQuery));

    return user;
  };

export const ProfileRoute = () => {
  const { username } = useParams();
  const { data: user } = useUser(username!);

  return (
    <>
      <Head
        title={
          user.user?.username
            ? user.user?.name || user.user?.username
            : username
        }
      />
      {user.user ? <Profile user={user?.user} /> : <div>Hi</div>}
    </>
  );
};
