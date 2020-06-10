import gql from "graphql-tag";

export const GET_LANDING_ROBOTS = gql`
    query robots_by_stats($limit: Int) {
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

export const GET_ROBOT_INFO = gql`
    query robotInfo(
        $code: String
        $status: String
        $dateFrom: timestamp
        $dateTo: timestamp
        $limit: Int
        $offset: Int
        $orderBy: [robot_positions_order_by!]
    ) {
        robot: robots(where: { code: { _eq: $code } }) @connection(key: "robots_info_user_signals") {
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
            user_signals {
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

export const GET_ROBOT_INFO_NOT_AUTH = gql`
    query robotInfo($code: String) {
        robot: robots(where: { code: { _eq: $code } }) @connection(key: "robots_info_user_signals") {
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

export const GET_PUBLIC_STATISTICS = gql`
    query public_statistics($robotId: uuid!) {
        robots(where: { id: { _eq: $robotId } }) {
            statistics
        }
    }
`;

export const GET_ROBOT_POSITIONS = (key: string) => gql`
  query robotPositions(
    $robotId: uuid!
    $status: String_comparison_exp
    $dateFrom: timestamp
    $dateTo: timestamp
    $limit: Int
    $offset: Int
    $orderBy: [robot_positions_order_by!]
  ) {
    robot_positions(
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
    ) @connection(key: ${key}) {
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
      fee
      alerts
      volume
      robot {
        id
        user_signals {
          id
          volume
        }
      }
    }
  }
`;

export const GET_ROBOT_POSITIONS_NOT_AUTH = (key: string) => gql`
  query robotPositions(
    $robotId: uuid!
    $status: String_comparison_exp
    $dateFrom: timestamp
    $dateTo: timestamp
    $limit: Int
    $offset: Int
    $orderBy: [robot_positions_order_by!]
  ) {
    robot_positions(
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
    ) @connection(key: ${key}) {
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
      fee
      alerts
      volume
    }
  }
`;

export const GET_ROBOT_POSITIONS_ROBOT = (key: string) => gql`
  query robotPositions(
    $robotId: uuid!
    $status: String_comparison_exp
    $limit: Int
    $offset: Int
    $orderBy: [robot_positions_order_by!]
  ) {
    robot_positions(
      where: {
        robot_id: { _eq: $robotId }
        status: $status
      }
      limit: $limit
      offset: $offset
      order_by: $orderBy
    ) @connection(key: ${key}) {
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
      fee
      alerts
      volume
    }
  }
`;

export const GET_ROBOT_POSITIONS_USER = (key: string) => gql`
  query userRobotPositions(
    $robotId: uuid!
    $status: String_comparison_exp
    $limit: Int
    $offset: Int
    $orderBy: [user_positions_order_by!]
  ) {
    user_positions(
      where: {
        user_robot_id: { _eq: $robotId }
        status: $status
      }
      limit: $limit
      offset: $offset
      order_by: $orderBy
    ) @connection(key: ${key}) {
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

export const ROBOT_POSITION_WITH_CANDLE = (timeframe: number) => gql`
  query candles(
    $limit: Int
    $robotId: uuid!
  ) {
    candles: v_candles${timeframe}_positions(
      where: {
        robot_id: { _eq: $robotId }
      }
      limit: $limit
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
        id
        user_signals {
          id
          volume
          subscribed_at
        }
      }
    }
  }
`;

export const ROBOT_POSITION_WITH_CANDLE_NOT_AUTH = (timeframe: number) => gql`
  query candles(
    $limit: Int
    $robotId: uuid!
  ) {
    candles: v_candles${timeframe}_positions(
      where: {
        robot_id: { _eq: $robotId }
      }
      limit: $limit
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

export const USER_ROBOTS_POSITION_WITH_CANDLE = (timeframe: number) => gql`
  query candles(
    $limit: Int
    $robotId: uuid!
  ) {
    candles: v_candles${timeframe}_user_positions(
      where: {
        user_robot_id: { _eq: $robotId }
      }
      limit: $limit
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

export const GET_USER_ROBOTS_BY_EXCHANGE_ID = gql`
    query user_robots($user_ex_acc_id: uuid!) {
        user_robots(where: { user_ex_acc_id: { _eq: $user_ex_acc_id } }) {
            id
            status
        }
    }
`;

export const USER_ROBOTS = gql`
    query user_robots($user_id: uuid) {
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

export const GET_ROBOTS_BY_STATS = gql`
    query robots_by_stats(
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

export const GET_ROBOTS_BY_STATS_NOT_AUTH = gql`
    query robots_by_stats(
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

export const ROBOT_POSITIONS_COUNT_USER = gql`
    query aggregateUserPositions($robotId: uuid!, $status: String_comparison_exp) {
        user_positions_aggregate(where: { user_robot_id: { _eq: $robotId }, status: $status }) {
            aggregate {
                count
            }
        }
    }
`;

export const GET_ROBOT_INFO_USER_ROBOTS = gql`
    query robotInfo($code: String) {
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
            user_robots {
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
// TODO: Переименовать  константу на более логическое название
export const GET_ROBOT_INFO_NOT_AUTH_ROBOTS = gql`
    query robotInfo($code: String) {
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

export const GET_USER_POSITIONS_OPEN_POS = gql`
    query user_positions_open($user_id: uuid) {
        positions: user_positions(
            where: { status: { _eq: "open" }, user_id: { _eq: $user_id } }
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
