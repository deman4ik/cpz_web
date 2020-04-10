import gql from 'graphql-tag';

export const GET_LANDING_ROBOTS = gql`
  query robots_by_stats($limit: Int) {
    v_robots_stats(
      limit: $limit
      order_by: { recovery_factor: desc_nulls_last }
    ) {
      robots {
        id
        name
        code
        asset
        currency
        signals
        trading
        equity
        settings
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
    robot: robots(where: { code: { _eq: $code } })
      @connection(key: "robots_info_user_signals") {
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
      settings
      started_at
      user_signals {
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
        user_signals {
          volume
        }
      }
    }
  }
`;

// export const GET_ROBOT_POSITIONS1 = gql`
//   query robotPositions(
//     $robotId: uuid!
//     $status: String_comparison_exp
//     $dateFrom: timestamp
//     $dateTo: timestamp
//     $limit: Int
//     $offset: Int
//     $orderBy: [robot_positions_order_by!]
//   ) {
//     robot_positions(
//       where: {
//         robot_id: { _eq: $robotId }
//         status: $status
//         _or: [
//           {
//             _and: [
//               { entry_candle_timestamp: { _gte: $dateFrom } }
//               { entry_candle_timestamp: { _lte: $dateTo } }
//             ]
//           }
//           {
//             _and: [
//               { exit_candle_timestamp: { _gte: $dateFrom } }
//               { exit_candle_timestamp: { _lte: $dateTo } }
//             ]
//           }
//         ]
//       }
//       limit: $limit
//       offset: $offset
//       order_by: $orderBy
//     ) @connection(key: "robot_positions_open_signals") {
//       id
//       code
//       direction
//       status
//       entry_date
//       entry_candle_timestamp
//       entry_price
//       entry_action
//       exit_date
//       exit_candle_timestamp
//       exit_price
//       exit_action
//       bars_held
//       profit
//       alerts
//       volume
//       robot {
//         user_signals {
//           volume
//         }
//       }
//     }
//   }
// `;

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
        user_signals {
          volume
          subscribed_at
        }
      }
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
  query user_robots {
    robots: user_robots @connection(key: "user_robots_robots") {
      id
      status
      settings
      robot_id
      started_at
      equity
      robot {
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
  query robots_by_stats($name: String, $limit: Int, $offset: Int) {
    v_robots_stats(
      where: { robots: { name: { _ilike: $name }, trading: { _eq: true } } }
      limit: $limit
      offset: $offset
      order_by: { recovery_factor: desc_nulls_last }
    ) @connection(key: "v_robots_stats_robots", filter: ["name"]) {
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
        settings
        user_robots {
          id
          status
          settings
          started_at
          equity
        }
      }
    }
  }
`;

export const ROBOT_POSITIONS_COUNT_USER = gql`
  query aggregateUserPositions(
    $robotId: uuid!
    $status: String_comparison_exp
  ) {
    user_positions_aggregate(
      where: { user_robot_id: { _eq: $robotId }, status: $status }
    ) {
      aggregate {
        count
      }
    }
  }
`;

export const GET_ROBOT_INFO_USER_ROBOTS = gql`
  query robotInfo($code: String) {
    robot: robots(where: { code: { _eq: $code } })
      @connection(key: "robots_info_user_robots") {
      id
      name
      code
      exchange
      asset
      currency
      timeframe
      equity
      statistics
      settings
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

export const GET_USER_POSITIONS_OPEN_POS = gql`
  query user_positions_open {
    positions: user_positions(
      where: { status: { _eq: "open" } }
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
      user_robot {
        robot {
          name
          code
        }
      }
    }
  }
`;
