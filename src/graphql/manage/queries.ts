import gql from "graphql-tag";

/**
 * Запрос на получение  количества user_robots user_signals
 * Использование:  manage/dashboard
 */
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

/**
 *  Получение данных за определенный период
 *  @period - дата за определенный период
 *  Использование:  manage/dashboard
 */
export const GET_USER_STATS_DURING_PERIOD = gql`
    query getUsersStatsDuringPeriod($period: timestamp) {
        users(where: { created_at: { _gte: $period } }) {
            created_at
        }
    }
`;

/**
 * Получение данных юзерам
 * @where -  фильтрация
 * @order_by - сортировка
 * @limit - для пагинации
 * Использование:  manage/users
 */
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


/**
 *  Получение значения по общему количеству users
 *  Использование:  manage/users
 */
export const USERS_AGGREGATE = gql`
    query users_aggr {
        users_aggregate {
            aggregate {
                count
            }
        }
    }
`;

/**
 * Получение данных по всем  robots
 * @where -  фильтрация
 * @order_by - сортировка
 * @limit - для пагинации
 * Использование:  manage/robots
 */
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

/**
 *  Получение значения по общему количеству robots
 *  Использование:  manage/users
 */
export const ROBOTS_AGGREGATE = gql`
    query robots_aggr {
        robots_aggregate {
            aggregate {
                count
            }
        }
    }
`;

/**
 * Получение данных  user_signals
 * @where -  фильтрация
 * @order_by - сортировка
 * @limit - для пагинации
 * Использование: manage/user_signals
 */
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

/**
 *  Получение значения по общему количеству user_signals
 *  Использование:  manage/user_signals
 */
export const USER_SIGNALS_AGGREGATE = gql`
    query user_signals_aggr {
        user_signals_aggregate {
            aggregate {
                count
            }
        }
    }
`;

/**
 * Получение данных  user_robots
 * @where -  фильтрация
 * @order_by - сортировка
 * @limit - для пагинации
 * Использование:  manage/user_robots
 */
export const GET_USER_ROBOTS = gql`
    query get_user_robots($limit: Int, $where: user_robots_bool_exp, $order_by: [user_robots_order_by!]) {
        user_robots(limit: $limit, where: $where, order_by: $order_by) {
            user {
                name
                id
            }
            robot {
                name
                id
                equity
                exchange
                asset
                robot_settings {
                    volume
                }
            }
            status
            stopped_at
            created_at
        }
    }
`;


/**
 *  Получение значения по общему количеству user_robots
 *  Использование:  manage/user_signals
 */
export const USER_ROBOTS_AGGREGATE = gql`
    query user_robots_aggr {
        user_robots_aggregate {
            aggregate {
                count
            }
        }
    }
`;

/**
 *  Запрос на получение данных по фильтрам
 *  Использование:  manage/robots
 */
export const GET_ROBOTS_STATS = gql`
    query get_manage_robots_filters {
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


/**
 *  Запрос на получение данных по фильтрам
 *  Использование:  manage/user_robots
 */
export const GET_USER_ROBOTS_STATS = gql`
    query get_user_robots_filters {
        stats: robots(distinct_on: [exchange, asset]) {
            exchange
            asset
        }
    }
`;
