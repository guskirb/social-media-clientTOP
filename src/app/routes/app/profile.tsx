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
      <Head
        title={
          user
            ? user?.name
              ? `${user.name} (${user.username})`
              : user.username
            : username
        }
      />
      {user ? (
        <Profile user={user} />
      ) : (
        <div className="w-full flex justify-center items-center p-5">
          <p className="text-lg font-normal">User not found</p>
        </div>
      )}
    </>
  );
};
