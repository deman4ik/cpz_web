import gql from "graphql-tag";
import { DocumentNode } from "graphql";

function ROBOT_POSITION_CANDLE_SUB_FOR_USER(timeframe: number) {
    return gql`
      subscription candles(
        $robotId: uuid!
        $user_id: uuid  
      ) {
        candles: v_candles${timeframe}_user_positions(
          where: {
            user_robot_id: { _eq: $robotId }
            user_robot: { user_id: { _eq: $user_id } }    
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

function ROBOT_POSITION_CANDLE_SUB(timeframe: number, type?: string) {
    return gql`
      subscription candles(
        $robotId: uuid!
      ) {
        candles: v_candles${timeframe}${type ? `_${type}` : ""}_positions(
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

export function buildRobotPositionCandleSubQuery(isAuth: boolean, timeframe: number, type?: string): DocumentNode {
    return isAuth ? ROBOT_POSITION_CANDLE_SUB_FOR_USER(timeframe) : ROBOT_POSITION_CANDLE_SUB(timeframe, type);
}
