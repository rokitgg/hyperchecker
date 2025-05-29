import { randomUUID } from "node:crypto";
import { betterAuth } from "better-auth";
import { getSessionCookie } from "better-auth/cookies";
import { openAPI } from "better-auth/plugins";

import { env } from "../env";

/**
 * BetterAuth server configuration
 * @see https://docs.better-auth.com/configuration/server
 * @description This is the server configuration for our better-auth instance,
 * it manages the logic for all-things auth on our application.
 */

export const auth = betterAuth({
  appName: env.BETTER_AUTH_APP_NAME,
  secret: env.BETTER_AUTH_SECRET,
  baseUrl: env.BETTER_AUTH_URL,
  plugins: [openAPI()],
  emailAndPassword: {
    enabled: false,
  },
  socialProviders: {
    github: {
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    },
  },
  rateLimit: {
    enabled: true,
  },
  logger: {
    disabled: false,
  },
  advanced: {
    cookiePrefix: "auth",
    database: {
      generateId: () => {
        return randomUUID();
      },
    },
  },
});

export { getSessionCookie };
