import { z } from "zod";
import { isAddress } from "viem";

export const pointsInputSchema = z.object({
  address: z
    .string()
    .refine(
      (address) =>
        address === "" || address.endsWith(".hl") || isAddress(address),
      {
        message: "Please provide a valid EVM address.",
      },
    ),
});

export const pointsOutputSchema = z.array(
  z.object({
    name: z.string(),
    title: z.string(),
    description: z.string(),
    url: z.string(),
    avatar: z.string(),
    avatarClassName: z.string().optional(),
    points: z.number(),
    pointsAlias: z.string(),
    ref: z.string().url(),
  }),
);
