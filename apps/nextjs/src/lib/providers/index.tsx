"use client";

import { api } from "@acme/api/clients/react";
import { useState } from "react";
import { ORPCContext } from "../context/orpc";
import { createORPCReactQueryUtils } from "@orpc/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function ContextProviders({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  const [orpc] = useState(() => createORPCReactQueryUtils(api));

  return (
    <QueryClientProvider client={queryClient}>
      <ORPCContext.Provider value={orpc}>{children}</ORPCContext.Provider>
    </QueryClientProvider>
  );
}
