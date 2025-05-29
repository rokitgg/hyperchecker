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
