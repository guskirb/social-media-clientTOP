import { useParams } from "react-router-dom";

import Head from "../../../components/seo/head";
import Search from "../../../pages/search/search";

export const SearchRoute = () => {
  const params = useParams();

  return (
    <>
      <Head title={`${params.search} - Search`} />
      <Search params={params.search!} />
    </>
  );
};
