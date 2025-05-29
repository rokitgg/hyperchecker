import { createAuthClient } from "better-auth/react";
import { toast } from "sonner";

import { env } from "../env";

export const auth = createAuthClient({
  fetchOptions: {
    onError(e) {
      if (e.error.status === 429) {
        toast.error("Too many requests. Please try again later.");
      }
    },
  },
  baseUrl: env.BETTER_AUTH_URL as string,
});

export const { signUp, signIn, signOut, useSession } = auth;
