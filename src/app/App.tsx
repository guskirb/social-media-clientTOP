import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { RouterProvider } from "react-router-dom";

import { createRouter } from "./routes/routes";
import Provider from "./provider";

const AppRouter = () => {
  const queryClient = useQueryClient();

  const router = useMemo(() => createRouter(queryClient), [queryClient]);

  return <RouterProvider router={router} />;
};

function App() {
  return (
    <Provider>
      <AppRouter />
    </Provider>
  );
}

export default App;
