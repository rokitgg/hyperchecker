export type HyperSwapResponse = {
  success: boolean;
  address: string;
  id: string;
  pts: number;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  referrals: Array<any>;
  createdAt: number; // unix timestamp
  rank: number;
};

export type FelixResponse = Array<{
  id: number;
  adress: string;
  points_earned: number;
  total_points: number;
  referred_users: number;
  week_number: number;
  snapshot_timestamp: Date;
  created_at: Date;
}>;
