import { z } from "zod";
import { isAddress } from "viem";

export const pointsInputSchema = z.object({
  address: z.string().refine(isAddress, {
    message: "Invalid address - must be a valid Ethereum address.",
  }),
});

export const pointsOutputSchema = z.array(
  z.object({
    name: z.string(),
    title: z.string(),
    description: z.string(),
    avatar: z.string(),
    points: z.number(),
    pointsAlias: z.string(),
    ref: z.string().url(),
  }),
);
