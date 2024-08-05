import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "../lib/react-query"
import { ReactNode } from "react"

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
