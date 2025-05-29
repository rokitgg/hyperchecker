import { os } from "@orpc/server";
import { z } from "zod";

import type { auth } from "@acme/auth/server";

import { AuthMiddleware } from "./middlewares/auth";

export const rpc = os
  .$context<{
    auth: typeof auth;
    session: Awaited<ReturnType<typeof auth.api.getSession>>;
  }>()
  .errors({
    // common errors
    UNAUTHORIZED: {},
    RATE_LIMITED: {
      data: z.object({
        retryAfter: z.number(),
      }),
    },
  });

export const protectedProcedure = rpc.use(AuthMiddleware);
