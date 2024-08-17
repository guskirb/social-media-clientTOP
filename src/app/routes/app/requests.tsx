import { QueryClient } from "@tanstack/react-query";

import {
  getRequestsQueryOptions,
  useRequests,
} from "../../../pages/requests/api/get-requests";
import Requests from "../../../pages/requests/requests";
import Head from "../../../components/seo/head";

export const requestsLoader = (queryClient: QueryClient) => async () => {
  const requestsQuery = getRequestsQueryOptions();

  return (
    queryClient.getQueryData(requestsQuery.queryKey) ??
    (await queryClient.fetchQuery(requestsQuery))
  );
};

export const RequestsRoute = () => {
  const { data: requests } = useRequests();

  return (
    <>
      <Head title="Requests" />
      <Requests requests={requests} />
    </>
  );
};
