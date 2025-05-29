export type HyperBeatResponse = {
  data: {
    cron_get_ranked_points_by_timestamp: Array<{
      total_value: number;
    }>;
  };
};
