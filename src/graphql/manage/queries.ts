import gql from "graphql-tag";
import { stats } from "graphql/queryFragments";

export const USERS_BY_ROBOTS_AGGREGATE = gql`
    query usersCount {
        usersTotal: users_aggregate(where: { status: { _eq: 1 } }) {
            aggregate {
                count
            }
        }
        usersWithSignals: user_signals_aggregate(distinct_on: [user_id]) {
            aggregate {
                count
            }
        }
        usersWithRobots: user_robots_aggregate(where: { status: { _eq: "started" } }, distinct_on: [user_id]) {
            aggregate {
                count
            }
        }
    }
`;

export const GET_NEW_USERS_IN_PEROID = gql`
    query get_new_users($period: timestamp) {
        users(where: { created_at: { _gte: $period }, status: { _eq: 1 } }) {
            created_at
        }
    }
`;

export const ALL_USERS = gql`
    query get_all_users($limit: Int, $offset: Int, $where: users_bool_exp, $order_by: [users_order_by!]) {
        users(limit: $limit, offset: $offset, where: $where, order_by: $order_by) {
            name
            id
            email
            telegram_username
            created_at
            roles
            status
            telegram_id
            settings
            user_robots_aggregate {
                aggregate {
                    count
                }
            }
            user_signals_aggregate {
                aggregate {
                    count
                }
            }
            user_exchange_accs_aggregate {
                aggregate {
                    count
                }
            }
        }
    }
`;

export const ALL_USERS_AGGREGATE = gql`
    query users_aggr($where: users_bool_exp) {
        users_aggregate(where: $where) {
            aggregate {
                count
            }
        }
    }
`;

export const ALL_ROBOTS = gql`
    query get_all_robots($limit: Int, $offset: Int, $where: robots_bool_exp, $order_by: [robots_order_by!]) {
        robots(limit: $limit, offset: $offset, where: $where, order_by: $order_by) {
            id
            name
            status
            ${stats}
            robot_settings: all_robot_settings {
                robot_settings
                strategy_settings
            }
            trade_settings
            signals
            trading
            exchange
            asset
            currency
            timeframe
            strategy
            exchange
            available
            user_signals_aggregate {
                aggregate {
                    count
                }
            }
            user_robots_aggregate {
                aggregate {
                    count
                }
            }
        }
    }
`;

export const ALL_ROBOTS_AGGREGATE = gql`
    query get_all_robots_aggr($where: robots_bool_exp) {
        robots_aggregate(where: $where) {
            aggregate {
                count
            }
        }
    }
`;

export const ALL_USER_SIGNALS = gql`
    query get_all_user_signals(
        $limit: Int
        $offset: Int
        $where: user_signals_bool_exp
        $order_by: [user_signals_order_by!]
    ) {
        user_signals(limit: $limit, offset: $offset, where: $where, order_by: $order_by) {
            id
            robot {
                code
            }
            user {
                name
                id
            }
            subscribed_at
            volume
        }
    }
`;

export const USER_SIGNALS_AGGREGATE = gql`
    query get_user_signals_aggr($where: user_signals_bool_exp) {
        user_signals_aggregate(where: $where) {
            aggregate {
                count
            }
        }
    }
`;

export const ALL_USER_ROBOTS = gql`
    query get_all_user_robots(
        $limit: Int
        $offset: Int
        $where: user_robots_bool_exp
        $order_by: [user_robots_order_by!]
    ) {
        user_robots(limit: $limit, offset: $offset, where: $where, order_by: $order_by) {
            user {
                name
                id
            }
            ${stats}
            user_robot_settings {
                user_robot_settings
            }
            robot {
                name
                id
            }
            status
            stopped_at
            created_at
        }
    }
`;

export const USER_ROBOTS_AGGREGATE = gql`
    query user_robots_aggr($where: user_robots_bool_exp) {
        user_robots_aggregate(where: $where) {
            aggregate {
                count
            }
        }
    }
`;

export const ROBOTS_FILTERS = gql`
    query get_robots_filters {
        stats: robots(distinct_on: [exchange, asset, currency, strategy, timeframe, trading, status]) {
            exchange
            asset
            currency
            strategy
            timeframe
            trading
            status
        }
    }
`;

export const USER_ROBOTS_FILTERS = gql`
    query get_user_robots_filters {
        stats: robots(distinct_on: [exchange, asset]) {
            exchange
            asset
        }
    }
`;

export const SUPPORT_REQUESTS = gql`
    query get_users_support_requests($where: users_bool_exp) {
        support_requests: users(where: $where) {
            user_id: id
            user_name: name
            messages(limit: 1, order_by: { timestamp: desc }, where: { to: { _is_null: true } }) {
                data
                timestamp
            }
            messagesByTo(limit: 1, order_by: { timestamp: desc }, where: { data: {} }) {
                data
                timestamp
            }
            messages_aggregate(where: { to: { _is_null: true } }) {
                aggregate {
                    count
                }
            }
            messagesByTo_aggregate {
                aggregate {
                    count
                }
            }
        }
    }
`;
