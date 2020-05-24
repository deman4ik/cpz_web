import gql from "graphql-tag";

export const ROBOT_POSITION_WITH_CANDLE_SUB = (timeframe: number) => gql`
  subscription candles(
    $robotId: uuid!
  ) {
    candles: v_candles${timeframe}_positions(
      where: {
        robot_id: { _eq: $robotId }
      }
      limit: 1
    ) {
      candle {
        id
        time
        open
        high
        low
        close
        volume
      }
      position_entry
      position_exit
      robot {
        user_signals {
          volume
          subscribed_at
        }
      }
    }
  }
`;
