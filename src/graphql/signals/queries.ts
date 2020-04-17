import gql from 'graphql-tag';

export const GET_ROBOTS_BY_STATS = gql`
  query robots_by_stats(
    $limit: Int
    $offset: Int
    $name: String
  ) {
    v_robots_stats(
      where: {
        robots: {
            name: { _ilike: $name },
            signals: { _eq: true }
          }
      }
      limit: $limit
      offset: $offset
      order_by:{
        recovery_factor: desc_nulls_last
      }
    ) @connection(key: "v_robots_stats_signals", filter: ["name"]) {
      robots {
        id
        code
        name
        exchange
        asset
        currency
        status
        started_at
        equity
        settings
        robot_settings {
          volume
        }
        user_signals {
          subscribed_at
          volume
          equity
        }
      }
    }
  }
`;

export const ROBOT_AGGREGATE_COUNT = gql`
  query aggregate(
      $where: robots_bool_exp
    ){
    robots_aggregate(
      where: $where
    ) @connection(key: "robots_aggregate", filter: ["where"]) {
      aggregate {
        count
      }
    }
  }
`;

export const ROBOT_POSITIONS_COUNT = gql`
  query aggregate(
    $robotId: uuid!
    $status: String_comparison_exp
    $dateFrom: timestamp
  ){
    robot_positions_aggregate(
      where: {
        robot_id: { _eq: $robotId }
        status: $status
        _or: [
          {
            _and: [
              { entry_candle_timestamp: { _gte: $dateFrom } }
            ]
          }
          {
            _and: [
              { exit_candle_timestamp: { _gte: $dateFrom } }
            ]
          }
        ]
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;

export const GET_AGGR_STATISTICS = gql`
  query aggr_statistics(
    $exchange: String_comparison_exp
    $asset: String_comparison_exp
    $type: String_comparison_exp
  ) {
    stats: user_aggr_stats(
      where: {
        type: $type
        exchange: $exchange
        asset: $asset
        equity: { _has_key: "profit" }
      }) {
        statistics
      }
  }
`;

export const GET_USER_AGGR_STATS_ALL = gql`
  query user_aggr_stats_filters(
    $type: String_comparison_exp
  ){
    stats: user_aggr_stats(
      order_by: [{ exchange: asc_nulls_first }, { asset: asc_nulls_first } ]
      where: {
        type: $type
        equity: { _has_key: "profit" }
      }
    ) {
      id
      asset
      exchange
      equity
    }
  }
`;

export const GET_USER_AGGR_STATS_FILTERS = gql`
  query user_aggr_stats_filters(
    $type: String_comparison_exp
  ) {
    filters: user_aggr_stats(
      where: {
        type: $type
        equity: { _has_key: "profit" }
      }
    ) {
      asset
      exchange
    }
  }
`;

export const USER_SIGNALS = gql`
  query user_signals {
    signals: user_signals(
      order_by: { subscribed_at: asc, id: asc }
    ) @connection(key: "user_signals_robots") {
      robot {
        id
        name
        asset
        currency
        exchange
        user_signals {
          subscribed_at
          volume
          equity
        }
        code
        status
        started_at
      }
    }
  }
`;

export const USER_SIGNALS_ROBOT_OPEN_POS = gql`
  query user_signals_robot_pos {
    positions: v_user_signals_positions(
      where: { status: { _eq: "open" } }
      order_by: { entry_date: desc, robot: { exchange: asc, asset: asc } }
    ) {
      id
      code
      direction
      entry_date
      entry_price
      robot {
        code
        name
        asset
        exchange
      }
      user_signal {
        volume
      }
    }
  }
`;
