import gql from "graphql-tag";
import { DocumentNode } from "graphql";
import { candles } from "graphql/robots/queries";

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
          ${candles}
        }
      }
    `;
}

function ROBOT_POSITION_CANDLE_SUB(timeframe: number) {
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
          ${candles}
        }
      }
    `;
}
export function BACKTEST_POSITION_CANDLE_SUB(timeframe: number) {
    return gql`
      subscription candles(
        $backtest_id: uuid!
      ) {
        candles: v_candles${timeframe}_backtest_positions(
          where: {
            backtest_id: { _eq: $backtest_id }
          }
          limit: 1
        ) {
          ${candles}
        }
      }
    `;
}

export function buildRobotPositionCandleSubQuery(isAuth: boolean, timeframe: number): DocumentNode {
    return isAuth ? ROBOT_POSITION_CANDLE_SUB_FOR_USER(timeframe) : ROBOT_POSITION_CANDLE_SUB(timeframe);
}
