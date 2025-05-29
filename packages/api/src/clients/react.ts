import type { RouterClient } from "@orpc/server";
import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import { createORPCReactQueryUtils } from "@orpc/react-query";

import type { router } from "../root";

/**
 * Creates a client-side oRPC client.
 * @see https://orpc.unnoq.com/docs/client/client-side
 */

export const link = new RPCLink({
  url: new URL(
    "/rpc",
    typeof window !== "undefined"
      ? window.location.origin
      : "http://localhost:3000",
  ).toString(),
  headers: () => ({
    Authorization: "Bearer default-token",
  }),
});

/**
 * Client-side API caller
 * @see https://orpc.unnoq.com/docs/client/client-side
 * @example
 * ```ts
 * const { data } = api.example.list();
 * ```
 * or with react-query
 * ```ts
 * const { data } = orpc.posts.list.useQuery();
 * ```
 */
export const api: RouterClient<typeof router> = createORPCClient(link);

// React query utils
export const orpc = createORPCReactQueryUtils(api);
