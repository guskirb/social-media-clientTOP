import { QueryClient } from "@tanstack/react-query";
import { createBrowserRouter } from "react-router-dom";

import PersistAuth from "../../lib/persist-auth";

export const createRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      element: <PersistAuth />,
      children: [
        {
          path: "/login",
          lazy: async () => {
            const { LoginRoute } = await import("./auth/login");
            return { Component: LoginRoute };
          },
        },
        {
          path: "/register",
          lazy: async () => {
            const { RegisterRoute } = await import("./auth/register");
            return { Component: RegisterRoute };
          },
        },
      ],
    },
  ]);
