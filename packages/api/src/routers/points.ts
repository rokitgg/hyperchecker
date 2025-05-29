import { implement } from "@orpc/server";

import { contract } from "../contracts/points";
import { posts } from "../data/posts";
import ky from "ky";
import type { HyperBeatResponse } from "../types/hyperbeat";

const HyperBeatPayload = {
  query: `
    query GetWeeklyPoints($user_filter: String!, $start_timestamp: bigint!, $end_timestamp: bigint!) {
      cron_get_ranked_points_by_timestamp(args:{
        provider_filter: "hyperbeat",
        user_filter: $user_filter,
        start_timestamp: $start_timestamp,
        end_timestamp: $end_timestamp
      }) {
        total_value
      }
    }
  `,
  variables: {
    user_filter: "0x6c04B410BAEF510B95e618dff9889F762872657C",
    start_timestamp: 1743408000,
    end_timestamp: 1748217600,
  },
};

const getHyperbeatPoints = async (): Promise<number> => {
  const { data: hyperBeatData } = await ky
    .post("https://app.hyperbeat.org/api/points", {
      json: HyperBeatPayload,
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

const os = implement(contract);

export const points = os.get.points.handler(async () => {
  const hyperbeat = await getHyperbeatPoints();

  return [
    {
      name: "hyperbeat",
      title: "HyperBeat",
      description:
        "Automated vaults that optimize your returns from top DeFi protocols with just one click.",
      avatar: "/protocols/hyperbeat.svg",
      points: hyperbeat,
      pointsAlias: "Hearts",
      ref: "https://app.hyperbeat.org/earn?referral=8CD75D20",
    },
  ];
});

export const pointsRouter = os.router({
  get: {
    points,
  },
});
