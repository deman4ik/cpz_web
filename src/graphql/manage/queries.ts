import gql from "graphql-tag";

export const GET_USER_STATS = gql`
    query {
        users {
            user_robots {
                id
            }
            user_signals {
                id
            }
        }
    }
`;

export const GET_USER_STATS_DURING_PERIOD = gql`
    query getUsersStatsDuringPeriod($period: timestamp) {
        users(where: { created_at: { _gte: $period } }) {
            created_at
        }
    }
`;

export const GET_USERS = gql`
    query getUsers($where: users_bool_exp, $order_by: [users_order_by!], $limit: Int) {
        users(limit: $limit, where: $where, order_by: $order_by) {
            name
            id
            email
            telegram_username
            created_at
            roles
            status
            telegram_id
            settings
            user_robots {
                id
            }
            user_signals {
                id
            }
            user_exchange_accs {
                id
            }
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

export const USERS_AGGREGATE = gql`
    query users_aggr {
        users_aggregate {
            aggregate {
                count
            }
        }
    }
`;

export const GET_ROBOTS = gql`
    query get_robots($limit: Int, $where: robots_bool_exp, $order_by: [robots_order_by!]) {
        robots(limit: $limit, where: $where, order_by: $order_by) {
            id
            name
            status
            equity
            settings
            trade_settings
            signals
            trading
            exchange
            asset
            currency
            timeframe
            strategy
            exchange
            user_signals {
                id
            }
            user_robots {
                id
            }
        }
    }
`;

export const ROBOTS_AGGREGATE = gql`
    query robots_aggr {
        robots_aggregate {
            aggregate {
                count
            }
        }
    }
`;

export const GET_USER_SIGNALS = gql`
    query get_user_signals($limit: Int, $where: user_signals_bool_exp, $order_by: [user_signals_order_by!]) {
        user_signals(limit: $limit, where: $where, order_by: $order_by) {
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
    query user_signals_aggr {
        user_signals_aggregate {
            aggregate {
                count
            }
        }
    }
`;
