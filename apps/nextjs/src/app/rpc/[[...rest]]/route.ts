import { router } from "@acme/api/root";
import { RPCHandler } from "@orpc/server/fetch";

const handler = new RPCHandler(router);
import { auth } from "@acme/auth/server";

async function handleRequest(request: Request) {
  const { response } = await handler.handle(request, {
    prefix: "/rpc",
    context: {
      auth: auth,
      session: await auth.api.getSession({
        headers: request.headers,
      }),
    }, // Provide initial context if needed
  });

  return response ?? new Response("Not found", { status: 404 });
}

export const GET = handleRequest;
export const POST = handleRequest;
export const PUT = handleRequest;
export const PATCH = handleRequest;
export const DELETE = handleRequest;
