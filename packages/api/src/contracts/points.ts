import { oc } from "@orpc/contract";

import { pointsInputSchema, pointsOutputSchema } from "../schemas/points";

// Base contract, defines common errors for posts contract
const base = oc.errors({
  NOT_FOUND: {
    message: "Not found",
  },
});

export const pointsContract = base
  .route({
    summary: "GET Points",
    method: "GET",
    description: "Retrieve all available points",
    deprecated: false,
    tags: ["Points"],
  })
  .input(pointsInputSchema)
  .output(pointsOutputSchema);

export const contract = {
  get: {
    points: pointsContract,
  },
};
