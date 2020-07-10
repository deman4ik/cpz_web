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
    query get_robots($limit: Int) {
        robots(limit: $limit) {
            id
            code
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
            user_signals {
                id
            }
            user_robots {
                id
            }
        }
    }
`;
