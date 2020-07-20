import gql from "graphql-tag";

export const GET_ROBOTS_BY_STATS = gql`
    query robots_by_stats(
        $limit: Int
        $offset: Int
        $where: v_robots_stats_bool_exp
        $hash: String!
        $order_by: [v_robots_stats_order_by!]
        $user_id: uuid
    ) {
        v_robots_stats(where: $where, limit: $limit, offset: $offset, order_by: $order_by)
            @connection(key: "v_robots_stats_signals", filter: ["hash"]) {
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
                robot_settings {
                    volume
                }
                user_signals(where: { user_id: { _eq: $user_id } }) {
                    id
                    user_id
                    subscribed_at
                    volume
                    equity
                }
            }
        }
    }
`;

export const GET_ROBOTS_BY_STATS_NOT_AUTH = gql`
    query robots_by_stats(
        $limit: Int
        $offset: Int
        $where: v_robots_stats_bool_exp
        $hash: String!
        $order_by: [v_robots_stats_order_by!]
    ) {
        v_robots_stats(where: $where, limit: $limit, offset: $offset, order_by: $order_by)
            @connection(key: "v_robots_stats_signals", filter: ["hash"]) {
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
                robot_settings {
                    volume
                }
            }
        }
    }
`;

export const SEARCH_SIGNALS_FILTERS = gql`
    query signals_filters($where: robots_bool_exp) {
        filters: robots(where: $where, distinct_on: [id, exchange, asset, timeframe]) {
            id
            exchange
            asset
            timeframe
        }
        SearchProps @client {
            props {
                type
                filters
                orders
            }
        }
    }
`;

export const ROBOT_AGGREGATE_COUNT = gql`
    query aggregate($hash: String!, $where: robots_bool_exp) {
        robots_aggregate(where: $where) @connection(key: "robots_aggregate", filter: ["hash"]) {
            aggregate {
                count
            }
        }
    }
`;

export const ROBOT_POSITIONS_COUNT = gql`
    query aggregate($robotId: uuid!, $status: String_comparison_exp, $dateFrom: timestamp) {
        robot_positions_aggregate(
            where: {
                robot_id: { _eq: $robotId }
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

export const GET_AGGR_STATISTICS = gql`
    query aggr_statistics(
        $exchange: String_comparison_exp
        $asset: String_comparison_exp
        $type: String_comparison_exp
        $user_id: uuid
    ) {
        stats: user_aggr_stats(
            where: {
                type: $type
                exchange: $exchange
                asset: $asset
                equity: { _has_key: "profit" }
                user_id: { _eq: $user_id }
            }
        ) {
            user_id
            statistics
        }
    }
`;

export const GET_USER_AGGR_STATS_ALL = gql`
    query user_aggr_stats_filters($type: String_comparison_exp, $user_id: uuid) {
        stats: user_aggr_stats(
            order_by: [{ exchange: asc_nulls_first }, { asset: asc_nulls_first }]
            where: { type: $type, equity: { _has_key: "profit" }, user_id: { _eq: $user_id } }
        ) {
            user_id
            id
            asset
            exchange
            equity
        }
    }
`;

export const GET_USER_AGGR_STATS_FILTERS = gql`
    query user_aggr_stats_filters($type: String_comparison_exp) {
        filters: user_aggr_stats(where: { type: $type, equity: { _has_key: "profit" } }) {
            asset
            exchange
        }
    }
`;

export const USER_SIGNALS = gql`
    query user_signals($user_id: uuid) {
        signals: user_signals(order_by: { subscribed_at: asc, id: asc }) @connection(key: "user_signals_robots") {
            robot {
                id
                name
                asset
                currency
                exchange
                user_signals(where: { user_id: { _eq: $user_id } }) {
                    id
                    user_id
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
    query user_signals_robot_pos($user_id: uuid) {
        positions: v_user_signals_positions(
            where: { status: { _eq: "open" }, user_id: { _eq: $user_id } }
            order_by: { entry_date: desc, robot: { exchange: asc, asset: asc } }
        ) {
            id
            code
            direction
            entry_date
            entry_price
            user_id
            robot {
                id
                code
                name
                asset
                exchange
            }
            user_signal {
                id
                volume
            }
        }
    }
`;
