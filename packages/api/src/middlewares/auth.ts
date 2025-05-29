import { headers } from "next/headers";

import { auth } from "@acme/auth/server";

// Base oRPC instance, which defines context and common errors across all routers
import { rpc } from "../orpc";

export const AuthMiddleware = rpc.middleware(
  async ({ context, next, errors }) => {
    if (context.session) {
      return next({
        context: { session: context.session, auth },
      });
    }

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      throw errors.UNAUTHORIZED();
    }

    return next({
      context: { session, auth },
    });
  },
);
