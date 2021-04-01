import gql from "graphql-tag";
import { DocumentNode } from "graphql";
import { candles } from "graphql/robots/queries";

function ROBOT_POSITION_CANDLE_SUB_FOR_USER() {
    return gql`
      subscription candles(
        $robotId: uuid!
        $user_id: uuid  
      ) {
        candles: v_candles_user_positions(
          where: {
            user_robot_id: { _eq: $robotId }
            user_robot: { user_id: { _eq: $user_id } }    
          }
          limit: 1
          order_by: {candle: {timestamp: desc}}
        ) {
          ${candles}
        }
      }
    `;
}

function ROBOT_POSITION_CANDLE_SUB() {
    return gql`
      subscription candles(
        $robotId: uuid!
      ) {
        candles: v_candles_positions(
          where: {
            robot_id: { _eq: $robotId }
          }
          limit: 1
          order_by: {candle: {timestamp: desc}}
        ) {
          ${candles}
        }
      }
    `;
}

export function BACKTEST_POSITION_CANDLE_SUB() {
    return gql`
      subscription candles(
        $backtest_id: uuid!
      ) {
        candles: v_candles_backtest_positions(
          where: {
            backtest_id: { _eq: $backtest_id }
          }
          limit: 1
          order_by: {candle: {timestamp: desc}}
        ) {
          ${candles}
        }
      }
    `;
}

export function buildRobotPositionCandleSubQuery(isAuth: boolean): DocumentNode {
    return isAuth ? ROBOT_POSITION_CANDLE_SUB_FOR_USER() : ROBOT_POSITION_CANDLE_SUB();
}
