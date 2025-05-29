import { implement } from "@orpc/server";

import { contract } from "../contracts/points";
import { posts } from "../data/posts";
import ky from "ky";
import type { HyperBeatResponse } from "../types/hyperbeat";
import { HyperBeatPayload } from "../constants/hyperbeat";
import type { HyperSwapResponse } from "../types/protocols";

const getHyperbeatPoints = async (address: string): Promise<number> => {
  const { data: hyperBeatData } = await ky
    .post("https://app.hyperbeat.org/api/points", {
      json: HyperBeatPayload(address),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .json<HyperBeatResponse>();

  if (!hyperBeatData.cron_get_ranked_points_by_timestamp[0]?.total_value) {
    return 0;
  }

  const rawHyperbeatValue =
    hyperBeatData.cron_get_ranked_points_by_timestamp[0]?.total_value ?? 0;

  // Format to 2 decimals as a number
  return Math.round((rawHyperbeatValue / 1_000_000) * 100) / 100;
};

const getHyperSwapPoints = async (address: string): Promise<number> => {
  return 0;
  /*
  const data = await ky
    .get(
      `https://proxy.hyperswapx.workers.dev/api/signature/get-id?address=${address}`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Client-Token":
            "1748524758.bb7570d6240ab5e96855cb8dcf3cf576fcae8b2f804efa7ce2d5f2f8fce090e7",
        },
      },
    )
    .json<HyperSwapResponse>();

  if (!data.success) {
    return 0;
  }

  return data.pts;
  */
};

const os = implement(contract);

export const points = os.get.points.handler(async ({ input }) => {
  const { address } = input;
  const hyperbeat = await getHyperbeatPoints(address);
  const hyperswap = await getHyperSwapPoints(address);

  return [
    {
      name: "hyperbeat",
      title: "HyperBeat",
      description:
        "Automated vaults that optimize your returns from top DeFi protocols with just one click.",
      avatar: "/protocols/hyperbeat.svg",
      avatarClassName: "bg-white",
      url: "app.hyperbeat.org",
      points: hyperbeat,
      pointsAlias: "Hearts",
      ref: "https://app.hyperbeat.org/earn?referral=8CD75D20",
    },
    {
      name: "hyperswap",
      title: "HyperSwap",
      description: "First HyperEVM native AMM DEX and Liquidity Hub",
      avatar: "/protocols/hyperswap.svg",
      url: "app.hyperswap.exchange",
      points: hyperswap,
      pointsAlias: "Points",
      ref: "hhttps://app.hyperswap.exchange/#/swap?referral=RokitG",
    },
  ];
});

export const pointsRouter = os.router({
  get: {
    points,
  },
});
