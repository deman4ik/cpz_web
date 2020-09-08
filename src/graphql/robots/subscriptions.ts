import gql from "graphql-tag";
import { DocumentNode } from "graphql";

function ROBOT_POSITION_CANDLE_SUB(timeframe: number) {
    return gql`
      subscription candles(
        $robotId: uuid!
        $user_id: uuid  
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
            user_signals(where:{user_id:{_eq:$user_id}}) {
              volume
              subscribed_at
            }
          }
        }
      }
    `;
}

function ROBOT_POSITION_CANDLE_SUB_NOT_AUTH(timeframe: number) {
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

export function buildRobotPositionCandleSubQuery(isAuth: boolean, timeframe: number): DocumentNode {
    return isAuth ? ROBOT_POSITION_CANDLE_SUB(timeframe) : ROBOT_POSITION_CANDLE_SUB_NOT_AUTH(timeframe);
}
