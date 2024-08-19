import { QueryClient } from "@tanstack/react-query";
import { createBrowserRouter, Navigate } from "react-router-dom";

import RequireAuth from "../../lib/require-auth";
import PersistAuth from "../../lib/persist-auth";
import AppRoot from "./app/root";
import { userLoader } from "./app/profile";
import { postsLoader } from "./app/home";
import { likesLoader } from "./app/likes";
import { requestsLoader } from "./app/requests";

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
          element: (
            <RequireAuth>
              <AppRoot />
            </RequireAuth>
          ),
          children: [
            {
              path: "/home",
              lazy: async () => {
                const { HomeRoute } = await import("./app/home");
                return { Component: HomeRoute };
              },
              // loader: postsLoader(queryClient),
            },
            {
              path: "/requests",
              lazy: async () => {
                const { RequestsRoute } = await import("./app/requests");
                return { Component: RequestsRoute };
              },
              loader: requestsLoader(queryClient),
            },
            {
              path: "/likes",
              lazy: async () => {
                const { LikesRoute } = await import("./app/likes");
                return { Component: LikesRoute };
              },
              // loader: likesLoader(queryClient),
            },
            {
              path: "/post/:id",
              lazy: async () => {
                const { PostRoute } = await import("./app/post");
                return { Component: PostRoute };
              },
            },
            {
              path: "/search/:search",
              lazy: async () => {
                const { SearchRoute } = await import("./app/search");
                return { Component: SearchRoute };
              },
            },
            {
              path: "/profile/:username",
              lazy: async () => {
                const { ProfileRoute } = await import("./app/profile");
                return { Component: ProfileRoute };
              },
              loader: userLoader(queryClient),
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
