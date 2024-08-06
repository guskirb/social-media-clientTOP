import { QueryClient } from "@tanstack/react-query";
import { createBrowserRouter, Navigate } from "react-router-dom";

import RequireAuth from "../../lib/require-auth";
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
        {
          element: <RequireAuth />,
          children: [
            {
              path: "/home",
              lazy: async () => {
                const { HomeRoute } = await import("./app/home");
                return { Component: HomeRoute };
              },
            },
            {
              path: "*",
              element: <Navigate to="/home" />,
            },
          ],
        },
      ],
    },
  ]);
