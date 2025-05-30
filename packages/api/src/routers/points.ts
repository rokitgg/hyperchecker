import { implement } from "@orpc/server";

import { contract } from "../contracts/points";
import { posts } from "../data/posts";
import ky from "ky";
import type { HyperBeatResponse } from "../types/hyperbeat";
import { HyperBeatPayload } from "../constants/hyperbeat";
import type { HyperSwapResponse, FelixResponse } from "../types/protocols";
import { FRONTEND_API_KEY } from "../constants/felix";

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

const getFelixPoints = async (address: string): Promise<number> => {
  const data = await ky
    .get(
      `https://rbskphftvfnpcetghldu.supabase.co/rest/v1/points_snapshots?select=*&address=eq.${address.toLowerCase()}&order=week_number.asc`,
      {
        headers: {
          "Content-Type": "application/json",
          apiKey: FRONTEND_API_KEY,
        },
      },
    )
    .json<FelixResponse>();

  console.log(data);

  if (!data.length || !data[0]) {
    return 0;
  }

  return Number(data[0].total_points.toFixed(2));
};

const os = implement(contract);

export const points = os.get.points.handler(async ({ input }) => {
  const { address } = input;
  const hyperbeat = await getHyperbeatPoints(address);
  const hyperswap = await getHyperSwapPoints(address);
  const felix = await getFelixPoints(address);

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
      ref: "https://app.hyperswap.exchange/#/swap?referral=rokitg",
    },
    {
      name: "felix",
      title: "Felix",
      description:
        "Borrow against blue-chip collateral and earn native yield with the Felix stablecoin, feUSD",
      avatar: "/protocols/felix.webp",
      avatarClassName: "",
      url: "usefelix.xyz",
      points: felix,
      pointsAlias: "Points",
      ref: "https://usefelix.xyz?ref=C098A690",
    },
  ];
});

export const pointsRouter = os.router({
  get: {
    points,
  },
});
