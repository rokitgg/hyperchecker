import { toNextJsHandler } from "@acme/auth/nextjs";
import { auth } from "@acme/auth/server";

export const { POST, GET } = toNextJsHandler(auth);
