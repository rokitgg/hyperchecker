/**
 * Creates a server-side oRPC client.
 * @see https://orpc.unnoq.com/docs/client/server-side#router-client
 */

import { createRouterClient } from "@orpc/server";

import { router } from "../root";

/**
 * Server-side API caller
 * @see https://orpc.unnoq.com/docs/client/server-side#router-client
 * @example
 * ```ts
 * const { data } = await api.example.list();
 * ```
 */
export const api = createRouterClient(router, {
  context: {}, // Provide initial context if needed
});
