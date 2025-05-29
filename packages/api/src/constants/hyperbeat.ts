export const HyperBeatPayload = (address: string) => ({
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
    user_filter: address,
    start_timestamp: 1743408000,
    end_timestamp: 1748217600,
  },
});
