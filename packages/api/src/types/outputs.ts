import type { InferRouterOutputs } from "@orpc/server";
import type { router } from "../root";

export type Outputs = InferRouterOutputs<typeof router>;

export type ProtocolOutput = Outputs["get"]["points"][number];
