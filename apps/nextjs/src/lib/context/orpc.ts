import { createContext, use } from "react";
import type { RouterUtils } from "@orpc/react-query";
import type { RouterClient } from "@orpc/server";
import type { router } from "@acme/api/root";

type ORPCReactUtils = RouterUtils<RouterClient<typeof router>>;

export const ORPCContext = createContext<ORPCReactUtils | undefined>(undefined);

export function useORPC(): ORPCReactUtils {
  const orpc = use(ORPCContext);
  if (!orpc) {
    throw new Error("ORPCContext is not set up properly");
  }
  return orpc;
}
