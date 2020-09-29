import gql from "graphql-tag";
import { DocumentNode } from "graphql";

export const TOP_PERFORMANCE_ROBOTS = gql`
    query get_top_robots_by_stats($limit: Int) {
        v_robots_stats(limit: $limit, order_by: { recovery_factor: desc_nulls_last, id: asc }) {
            robots {
                id
                name
                code
                asset
                currency
                signals
                trading
                equity
                robot_settings {
                    volume
                }
                statistics
            }
        }
    }
`;

export const ROBOT_INFO_FOR_USER = gql`
    query get_robot_info_for_user(
        $code: String
        $status: String
        $dateFrom: timestamp
        $dateTo: timestamp
        $limit: Int
        $offset: Int
        $orderBy: [robot_positions_order_by!]
        $user_id: uuid
    ) {
        robot: robots(where: { code: { _eq: $code } }) {
            id
            name
            code
            mod
            exchange
            asset
            currency
            timeframe
            available
            status
            equity
            statistics
            robot_settings {
                volume
            }
            started_at
            user_signals(where: { user_id: { _eq: $user_id } }) {
                id
                subscribed_at
                volume
                statistics
                equity
            }
            strategyByStrategy {
                description
            }
        }
    }
`;

export const ROBOT_INFO = gql`
    query get_robot_info($code: String) {
        robot: robots(where: { code: { _eq: $code } }) {
            id
            name
            code
            mod
            exchange
            asset
            currency
            timeframe
            available
            status
            equity
            statistics
            robot_settings {
                volume
            }
            started_at
            strategyByStrategy {
                description
            }
        }
    }
`;

export const PUBLIC_STATISTICS = gql`
    query get_public_statistics($robotId: uuid!) {
        robots(where: { id: { _eq: $robotId } }) {
            statistics
        }
    }
`;

export const SIGNAL_POSITIONS_FOR_USER = gql`
    query get_signal_positions_for_user(
        $user_id: uuid
        $robotId: uuid!
        $status: String_comparison_exp
        $dateFrom: timestamp
        $dateTo: timestamp
        $limit: Int
        $offset: Int
        $orderBy: [v_user_signal_positions_order_by!]
    ) {
        positions: v_user_signal_positions(
            where: {
                robot_id: { _eq: $robotId }
                user_id: { _eq: $user_id }
                status: $status
                _or: [
                    {
                        _and: [
                            { entry_candle_timestamp: { _gte: $dateFrom } }
                            { entry_candle_timestamp: { _lte: $dateTo } }
                        ]
                    }
                    {
                        _and: [
                            { exit_candle_timestamp: { _gte: $dateFrom } }
                            { exit_candle_timestamp: { _lte: $dateTo } }
                        ]
                    }
                ]
            }
            limit: $limit
            offset: $offset
            order_by: $orderBy
        ) {
            id
            code
            direction
            status
            entry_date
            entry_candle_timestamp
            entry_price
            entry_action
            exit_date
            exit_candle_timestamp
            exit_price
            exit_action
            bars_held
            profit
            alerts
            volume
            robot {
                id
                user_signals(where: { user_id: { _eq: $user_id } }) {
                    id
                    volume
                }
            }
        }
    }
`;

export const ROBOT_POSITIONS_IN_INTERVAL = gql`
    query get_robot_positions_in_interval(
        $robotId: uuid!
        $status: String_comparison_exp
        $dateFrom: timestamp
        $dateTo: timestamp
        $limit: Int
        $offset: Int
        $orderBy: [v_robot_positions_order_by!]
    ) {
        positions: v_robot_positions(
            where: {
                robot_id: { _eq: $robotId }
                status: $status
                _or: [
                    {
                        _and: [
                            { entry_candle_timestamp: { _gte: $dateFrom } }
                            { entry_candle_timestamp: { _lte: $dateTo } }
                        ]
                    }
                    {
                        _and: [
                            { exit_candle_timestamp: { _gte: $dateFrom } }
                            { exit_candle_timestamp: { _lte: $dateTo } }
                        ]
                    }
                ]
            }
            limit: $limit
            offset: $offset
            order_by: $orderBy
        ) {
            id
            code
            direction
            status
            entry_date
            entry_candle_timestamp
            entry_price
            entry_action
            exit_date
            exit_candle_timestamp
            exit_price
            exit_action
            bars_held
            profit
            alerts
            volume
        }
    }
`;

export const ROBOT_POSITIONS = gql`
    query get_robot_positions(
        $robotId: uuid!
        $status: String_comparison_exp
        $limit: Int
        $offset: Int
        $orderBy: [v_robot_positions_order_by!]
    ) {
        positions: v_robot_positions(
            where: { robot: { id: { _eq: $robotId } }, status: $status }
            limit: $limit
            offset: $offset
            order_by: $orderBy
        ) {
            id
            code
            direction
            status
            entry_date
            entry_candle_timestamp
            entry_price
            entry_action
            exit_date
            exit_candle_timestamp
            exit_price
            exit_action
            bars_held
            profit
            alerts
            volume
        }
    }
`;

export const ROBOT_POSITIONS_FOR_USER = gql`
    query get_robot_positions_for_user(
        $robotId: uuid!
        $status: String_comparison_exp
        $limit: Int
        $offset: Int
        $orderBy: [user_positions_order_by!]
        $user_id: uuid
    ) {
        positions: user_positions(
            where: {
                user_robot_id: { _eq: $robotId }
                status: $status
                user_id: { _eq: $user_id }
                user_robot: { user_id: { _eq: $user_id } }
            }
            limit: $limit
            offset: $offset
            order_by: $orderBy
        ) {
            id
            code
            direction
            status
            entry_date
            entry_price
            entry_action
            exit_date
            exit_price
            exit_action
            bars_held
            profit
            user_robot_id
            user_robot {
                id
            }
            entry_executed
            volume: exit_executed
        }
    }
`;

export const ROBOT_CANDLES_FOR_USER_SIGNALS = (timeframe: number) => gql`
  query get_candles_for_user_signals(
    $userSignalId: uuid!
    $limit: Int
    $offset: Int
  ) {
    candles: v_candles${timeframe}_user_signal_positions(
      where: {
        user_signal_id: { _eq: $userSignalId }
      }
      limit: $limit
      offset: $offset
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
      user_signal {
       robot {
        id
        user_signals {
          id
          volume
          subscribed_at
        }
      }
     }
    }
  }
`;

export const CANDLES_FOR_ROBOT = (timeframe: number) => gql`
  query get_candles_for_robot(
    $robotId: uuid!
    $limit: Int
    $offset: Int
  ) {
    candles: v_candles${timeframe}_positions(
      where: {
        robot_id: { _eq: $robotId }
      }
      limit: $limit
      offset: $offset
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

export const CANDLES_FOR_USER_ROBOT = (timeframe: number) => gql`
  query get_candles_for_user_robot(
    $robotId: uuid!
    $user_id: uuid
    $limit: Int
    $offset: Int
  ) {
    candles: v_candles${timeframe}_user_positions(
      where: {
        user_robot_id: { _eq: $robotId }
        user_robot:{user_id:{_eq: $user_id}}    
      }
      limit: $limit
      offset: $offset
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
      user_robot {
        id
        settings
      }
    }
  }
`;

export function buildRobotPositionCandlesQuery(
    timeframe: number,
    isAuth: boolean,
    hasUserRobots = false
): DocumentNode {
    if (isAuth) {
        if (hasUserRobots) {
            return CANDLES_FOR_USER_ROBOT(timeframe);
        }
        return ROBOT_CANDLES_FOR_USER_SIGNALS(timeframe);
    }
    return CANDLES_FOR_ROBOT(timeframe);
}

export const USER_ROBOTS_BY_EXCHANGE_ID = gql`
    query get_user_robots_by_exchange_id($user_ex_acc_id: uuid!, $user_id: uuid) {
        user_robots(where: { user_ex_acc_id: { _eq: $user_ex_acc_id }, user_id: { _eq: $user_id } }) {
            id
            status
        }
    }
`;

export const USER_ROBOTS = gql`
    query get_user_robots($user_id: uuid) {
        robots: user_robots(order_by: { started_at: asc, id: asc }, where: { user_id: { _eq: $user_id } })
            @connection(key: "user_robots_robots") {
            id
            status
            settings
            robot_id
            started_at
            equity
            user_id
            robot {
                id
                name
                asset
                currency
                exchange
                code
                active: started_at
            }
        }
    }
`;

export const USER_ROBOTS_BY_STATS = gql`
    query get_user_robots_by_stats(
        $where: v_robots_stats_bool_exp
        $hash: String!
        $limit: Int
        $offset: Int
        $order_by: [v_robots_stats_order_by!]
        $user_id: uuid
    ) {
        v_robots_stats(where: $where, limit: $limit, offset: $offset, order_by: $order_by)
            @connection(key: "v_robots_stats_robots", filter: ["hash"]) {
            robots {
                id
                code
                name
                exchange
                asset
                currency
                status
                active: started_at
                equity
                robot_settings {
                    volume
                }
                user_robots(where: { user_id: { _eq: $user_id } }) {
                    id
                    user_id
                    status
                    settings
                    started_at
                    equity
                }
            }
        }
    }
`;

export const ROBOTS_BY_STATS = gql`
    query get_robots_by_stats(
        $where: v_robots_stats_bool_exp
        $hash: String!
        $limit: Int
        $offset: Int
        $order_by: [v_robots_stats_order_by!]
    ) {
        v_robots_stats(where: $where, limit: $limit, offset: $offset, order_by: $order_by)
            @connection(key: "v_robots_stats_robots", filter: ["hash"]) {
            robots {
                id
                code
                name
                exchange
                asset
                currency
                status
                active: started_at
                equity
                robot_settings {
                    volume
                }
            }
        }
    }
`;

export const USER_ROBOT_POSITIONS_AGGREGATE = gql`
    query get_user_robot_positions_aggr($robotId: uuid!, $status: String_comparison_exp) {
        positions_aggregate: user_positions_aggregate(where: { user_robot_id: { _eq: $robotId }, status: $status }) {
            aggregate {
                count
            }
        }
    }
`;

export const ROBOT_INFO_FOR_USER_ROBOT = gql`
    query get_robot_info_for_user_robot($code: String, $user_id: uuid) {
        robot: robots(where: { code: { _eq: $code } }) @connection(key: "robots_info_user_robots") {
            id
            name
            code
            exchange
            asset
            currency
            timeframe
            equity
            statistics
            robot_settings {
                volume
            }
            active: started_at
            user_robot: user_robots(where: { user_id: { _eq: $user_id } }) {
                id
                status
                settings
                started_at
                statistics
                message
                equity
            }
        }
    }
`;

export const ROBOT_INFO_FOR_ROBOTS = gql`
    query get_robot_info_for_robots($code: String) {
        robot: robots(where: { code: { _eq: $code } }) @connection(key: "robots_info_user_robots") {
            id
            name
            code
            exchange
            asset
            currency
            timeframe
            equity
            statistics
            robot_settings {
                volume
            }
            active: started_at
        }
    }
`;

export const OPEN_USER_POSITIONS = gql`
    query get_open_user_positions($user_id: uuid) {
        positions: user_positions(
            where: { status: { _eq: "open" }, user_id: { _eq: $user_id }, user_robot: { user_id: { _eq: $user_id } } }
            order_by: { entry_date: desc, exchange: asc, asset: asc }
        ) {
            id
            code
            direction
            entry_date
            entry_price
            volume: entry_executed
            code
            asset
            exchange
            user_id
            user_robot {
                id
                robot {
                    id
                    name
                    code
                }
            }
        }
    }
`;
