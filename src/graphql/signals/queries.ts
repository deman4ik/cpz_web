import gql from "graphql-tag";
import { stats, statsConfig } from "graphql/queryFragments";

export const SIGNALS_SEARCH = gql`
    query signal_robots_search(
        $limit: Int
        $offset: Int
        $where: robots_bool_exp
        $hash: String!
        $order_by: [robots_order_by!]
        $user_id: uuid
    ) {
        robots(limit: $limit, offset: $offset, where: $where, order_by: $order_by)
        @connection(key: "v_robots_stats_signals", filter: ["hash"]) {
            id
            code
            name
            exchange
            asset
            currency
            status
            started_at
            ${stats}
            robot_settings {
                robot_settings
            }
        }
    }
`;

export const ALL_SIGNAL_ROBOTS = gql`
    query all_signal_robots(
        $limit: Int
        $offset: Int
        $where: robots_bool_exp
        $hash: String!
        $order_by: [robots_order_by!]
    ) {
        robots(where: $where, limit: $limit, offset: $offset, order_by: $order_by)
            @connection(key: "v_robots_stats_signals", filter: ["hash"]) {
                id
                code
                name
                exchange
                asset
                currency
                status
                started_at
                ${stats}
                robot_settings {
                    robot_settings
                }
        }
    }
`;

export const ROBOTS_AGGREGATE = gql`
    query get_signal_robots_aggr($hash: String!, $where: robots_bool_exp) {
        robots_aggregate(where: $where) @connection(key: "robots_aggregate", filter: ["hash"]) {
            aggregate {
                count
            }
        }
    }
`;

export const SIGNAL_ROBOT_POSITIONS_AGGREGATE = gql`
    query get_robot_positions_aggr($robot_id: uuid!, $status: String_comparison_exp, $dateFrom: timestamp) {
        positions_aggregate: v_robot_positions_aggregate(
            where: {
                robot_id: { _eq: $robot_id }
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

export const USER_AGRR_STATS = gql`
    query get_user_signal_robot_stats_aggr(
        $exchange: String!
        $asset: String!
        $type: String!
        $user_id: uuid
        $limit: Int
    ) {
        stats: v_user_aggr_stats(
            limit: $limit
            where: {
                type: { _eq: $type }
                exchange: { _eq: $exchange }
                asset: { _eq: $asset }
                user_id: { _eq: $user_id }
            }
        ) {
            user_id
            statistics: full_stats
            equity
        }
    }
`;

export const ALL_USER_AGGR_STATS = gql`
    query get_all_user_stats_aggr($type: String_comparison_exp, $user_id: uuid) {
        stats: v_user_aggr_stats(
            where: { type: $type, user_id: { _eq: $user_id }, 
            exchange: { _eq: "-" }, 
            asset: { _eq: "-" } }
        ) {
            user_id
            id
            asset
            ${statsConfig}
            exchange
        }
    }
`;

export const ROBOTS_TOTAL_PERFORMANCE = gql`
    query robots_total_performance {
        stats: v_robot_aggr_stats(where: {exchange: { _eq: "-" }, asset: { _eq: "-" }}) {
            ${statsConfig}
            asset
            exchange
            id
        }
    }
`;
export const ROBOTS_TOTAL_PERFORMANCE_WITH_STATS = gql`
    query robots_total_performance_with_stats($limit: Int, $exchange: String!, $asset: String!) {
        stats: v_robot_aggr_stats(
            limit: $limit
            where: { exchange: { _eq: $exchange }, asset: { _eq: $asset } }
            order_by: [{ exchange: asc_nulls_first }, { asset: asc_nulls_first }]
        ) {
            statistics: full_stats
            equity
            asset
            exchange
            id
        }
    }
`;

export const USER_ROBOTS_TOTAL_PERFORMANCE = gql`
    query user_robots_total_performance {
        stats: v_user_robot_aggr_stats(where: {exchange: { _eq: "-" }, asset: { _eq: "-" }}) {
            ${statsConfig}
            asset
            exchange
            id
        }
    }
`;

export const USER_ROBOTS_TOTAL_PERFORMANCE_WITH_STATS = gql`
    query user_robots_total_performance_with_stats($limit: Int, $exchange: String!, $asset: String!) {
        stats: v_user_robot_aggr_stats(
            limit: $limit
            where: { exchange: { _eq: $exchange }, asset: { _eq: $asset } }
            order_by: [{ exchange: asc_nulls_first }, { asset: asc_nulls_first }]
        ) {
            statistics: full_stats
            asset
            exchange
            id
            equity
        }
    }
`;

export const USER_AGGR_STATS_FILTERS = gql`
    query get_aggr_stats_filters_for_user_robots($type: String!, $user_id: uuid!) {
        filters: user_aggr_stats(
            where: { type: { _eq: $type }, user_id: { _eq: $user_id }, exchange: { _neq: "-" }, asset: { _neq: "-" } }
        ) {
            asset
            exchange
        }
    }
`;

export const USER_SIGNALS = gql`
    query get_signals_for_user($user_id: uuid) {
        signals: user_signals(order_by: { subscribed_at: asc, id: asc }, where: { user_id: { _eq: $user_id } })
            @connection(key: "user_signals_robots") {
            user_id
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
                    ${stats}
                    user_signal_settings {
                        signal_settings
                    }
                }
                code
                status
                started_at
            }
        }
    }
`;

export const OPEN_POSITIONS_FOR_USER_SIGNALS = gql`
    query get_open_positions_for_user_signals($user_id: uuid) {
        positions: v_user_signal_positions(
            where: { status: { _eq: "open" }, user_id: { _eq: $user_id }, user_signal: { user_id: { _eq: $user_id } } }
            order_by: { entry_date: desc, robot: { exchange: asc, asset: asc } }
        ) {
            id
            code
            direction
            entry_date
            entry_price
            user_id
            profit
            volume
            robot {
                id
                code
                name
                asset
                currency
                exchange
                robot_settings {
                    robot_settings
                }
            }
            user_signal {
                id
                user_signal_settings {
                    signal_settings
                }
            }
        }
    }
`;

export const AGGREGATED_OPEN_POSITIONS_FOR_SIGNLAS_BY_DIRECTION = gql`
    query get_aggregated_open_user_positions_by_direction($user_id: uuid!, $direction: String!) {
        v_user_signal_positions_aggregate(
            where: { user_id: { _eq: $user_id }, status: { _eq: "open" }, direction: { _eq: $direction } }
        ) {
            aggregate {
                count
            }
            nodes {
                profit
            }
        }
    }
`;
