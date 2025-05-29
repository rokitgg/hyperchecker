import type { InferRouterInputs } from "@orpc/server";
import type { router } from "../root";

export type Inputs = InferRouterInputs<typeof router>;
