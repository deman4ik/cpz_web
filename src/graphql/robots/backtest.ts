import gql from "graphql-tag";
import { position_fields } from "graphql/robots/queries";

export const BACKTEST_POSITIONS_AGGREGATE = gql`
    query v_backtest_positions_aggregate($backtest_id: uuid!, $status: String_comparison_exp, $dateFrom: timestamp) {
        positions_aggregate: v_backtest_positions_aggregate(
            where: {
                backtest_id: { _eq: $backtest_id }
                status: $status
                _or: [
                    { _and: [{ entry_candle_timestamp: { _gte: $dateFrom } }] }
                    { _and: [{ exit_candle_timestamp: { _gte: $dateFrom } }] }
                ]
            }
        ) {
            aggregate {
                count
            }
        }
    }
`;

export const BACKTEST_POSITIONS = gql`
    query get_backtest_positions(
        $backtest_id: uuid!
        $status: String_comparison_exp
        $limit: Int
        $offset: Int
        $orderBy: [v_backtest_positions_order_by!]
    ) {
        positions: v_backtest_positions(
            where: { backtest_id: { _eq: $backtest_id }, status: $status }
            limit: $limit
            offset: $offset
            order_by: $orderBy
        ) {
            ${position_fields}
        }
    }
`;

export const BACKTEST_SIGNALS = gql`
    query get_all_backtetst_signals(
        $limit: Int
        $offset: Int
        $where: backtest_signals_bool_exp
        $order_by: [backtest_signals_order_by!]
    ) {
        backtest_signals(limit: $limit, offset: $offset, where: $where, order_by: $order_by) {
            id
            action
            candle_timestamp
            created_at
            order_type
            position_id
            position_code
            position_prefix
            price
            robot_id
            type
            updated_at
        }
    }
`;

export const BACKTEST_SIGNALS_AGGREGATE = gql`
    query get_backtest_signals_aggr($where: backtest_signals_bool_exp) {
        backtest_signals_aggregate(where: $where) {
            aggregate {
                count
            }
        }
    }
`;

const backtest_info = `asset
            id
            exchange
            timeframe
            currency
            strategy
            robot_id
            date_from
            date_to`;

const backtest_status = `left_bars
            total_bars
            processed_bars
            completed_percent
            status
            error`;

export const BACKTESTS = gql`
    query get_backtests($limit: Int, $offset: Int, $where: backtests_bool_exp, $order_by: [backtests_order_by!]) {
        backtests(limit: $limit, where: $where, order_by: $order_by) {
            ${backtest_info}
            ${backtest_status}
            backtest_stats {
                equity_avg
                last_position_exit_date
                statistics
            }

            finished_at
            robot {
                code
                robot_settings {
                    strategy_settings
                    robot_settings
                }
            }
            settings
        }
    }
`;
export const BACKTEST = gql`
    query get_backtests($limit: Int, $offset: Int, $where: backtests_bool_exp, $order_by: [backtests_order_by!]) {
        backtests(limit: $limit, where: $where, order_by: $order_by) {
            robot_id
            ${backtest_info}
            backtest_logs {
                data
                backtest_id
                candle_timestamp
                created_at
                id
                robot_id
                updated_at
            }
            backtest_stats {
                equity
                last_position_exit_date
                statistics
            }
            robot {
                id
                name
                code
            }
            backtest_settings {
                active_from
                robot_settings
                strategy_settings
            }
        }
    }
`;

export const BACKTESTS_AGGREGATE = gql`
    query get_backtests_aggregate($where: backtests_bool_exp) {
        backtests_aggregate(where: $where) {
            aggregate {
                count
            }
        }
    }
`;
