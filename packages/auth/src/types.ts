import type { SocialProvider } from "better-auth/social-providers";
import { z } from "zod";

import type { auth } from "./server";
import type { auth as clientSideAuth } from "./client";

export type SessionObject = typeof auth.$Infer.Session;

export type Session = SessionObject["session"];

export type User = SessionObject["user"];

export type SocialProviders = Parameters<
  typeof clientSideAuth.signIn.social
>[0]["provider"];

export type ActiveSessions = {
  id: string;
  userId: string;
  expiresAt: Date;
  ipAddress?: string | undefined;
  userAgent?: string | undefined;
}[];

export const ZodSession = z.object({
  session: z.object({
    id: z.string(),
    userId: z.string(),
    expiresAt: z.date(),
    ipAddress: z.string().nullish(),
    userAgent: z.string().nullish(),
  }),
  user: z.object({
    id: z.string(),
    email: z.string(),
    emailVerified: z.boolean(),
    name: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    image: z.string().nullish(),
  }),
});

export type ZodSession = z.infer<typeof ZodSession>;

export type { SocialProvider };
