import gql from "graphql-tag";
import { DocumentNode } from "graphql";

function SIGNAL_POSITION_CANDLE_SUB_FOR_USER(timeframe: number) {
    return gql`
      subscription candles(
        $userSignalId: uuid!
      ) {
        candles: v_candles${timeframe}_user_signal_positions(
          where: {
            user_signal_id: { _eq: $userSignalId }
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
        }
      }
    `;
}

function SIGNAL_POSITION_CANDLE_SUB(timeframe: number) {
    return gql`
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
        }
      }
    `;
}

export function buildSignalPositionCandleSubQuery(isAuth: boolean, timeframe: number): DocumentNode {
    return isAuth ? SIGNAL_POSITION_CANDLE_SUB_FOR_USER(timeframe) : SIGNAL_POSITION_CANDLE_SUB(timeframe);
}
