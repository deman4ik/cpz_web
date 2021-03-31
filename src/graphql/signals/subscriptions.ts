import gql from "graphql-tag";
import { DocumentNode } from "graphql";

function SIGNAL_POSITION_CANDLE_SUB_FOR_USER() {
    return gql`
        subscription candles($userSignalId: uuid!) {
            candles: v_candles_user_signal_positions(where: { user_signal: { id: { _eq: $userSignalId } } }, limit: 1) {
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

function SIGNAL_POSITION_CANDLE_SUB() {
    return gql`
        subscription candles($robotId: uuid!) {
            candles: v_candles_positions(where: { robot_id: { _eq: $robotId } }, limit: 1) {
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

export function buildSignalPositionCandleSubQuery(isAuth: boolean): DocumentNode {
    return isAuth ? SIGNAL_POSITION_CANDLE_SUB_FOR_USER() : SIGNAL_POSITION_CANDLE_SUB();
}
