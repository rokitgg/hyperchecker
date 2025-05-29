import { createEnv } from "@t3-oss/env-nextjs";
import { vercel } from "@t3-oss/env-nextjs/presets-zod";
import { z } from "zod";

export const env = createEnv({
  extends: [vercel()],
  server: {
    GITHUB_ID: z.string().min(1).default("id"),
    GITHUB_SECRET: z.string().min(1).default("supersecret"),
    BETTER_AUTH_APP_NAME: z.string().min(1).default("Ultimate Starter Kit"),
    BETTER_AUTH_URL: z.string().default("http://localhost:3000"),
    BETTER_AUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string().min(1)
        : z.string().min(1).optional(),
    NODE_ENV: z.enum(["development", "production"]).optional(),
    PORT: z.string().default("3000"),
  },
  client: {},
  experimental__runtimeEnv: {},
  skipValidation:
    !!process.env.CI || process.env.npm_lifecycle_event === "lint",
});
