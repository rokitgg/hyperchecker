import { os } from "@orpc/server";

import type { auth as betterAuth } from "@acme/auth/server";

export const authed = os.$context<{
  // Include better-auth session in context
  session: Awaited<ReturnType<typeof betterAuth.api.getSession>>;
}>();
