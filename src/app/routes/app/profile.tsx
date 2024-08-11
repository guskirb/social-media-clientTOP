import Head from "../../../components/seo/head";
import { useParams, LoaderFunctionArgs } from "react-router-dom";
import {
  getUserQueryOptions,
  useUser,
} from "../../../pages/profile/api/get-user";
import Profile from "../../../pages/profile/profile";
import { QueryClient } from "@tanstack/react-query";
import Loader from "../../../components/ui/loader/loader";

export const userLoader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const username = params.username as string;
    const userQuery = getUserQueryOptions(username);

    return (
      queryClient.getQueryData(userQuery.queryKey) ??
      (await queryClient.fetchQuery(userQuery))
    );
  };

export const ProfileRoute = () => {
  const { username } = useParams();
  const { data: user, isLoading } = useUser(username!);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Head title={user?.username ? user?.name || user?.username : username} />
      {user ? <Profile user={user} /> : <div>Hi</div>}
    </>
  );
};
