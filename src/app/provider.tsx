import { QueryClientProvider } from "@tanstack/react-query"
import { ReactNode } from "react"

import { queryClient } from "../lib/react-query";

type ProviderProps = {
    children: ReactNode
}

export default function Provider({children}:ProviderProps) {
  return (
    <QueryClientProvider client={queryClient} >
        {children}
    </QueryClientProvider>
  )
}
