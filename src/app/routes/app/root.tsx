import { Outlet } from "react-router-dom";
import Layout from "../../../components/layout/dashboard-layout";

export default function AppRoot() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
