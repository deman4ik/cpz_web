import gql from "graphql-tag";
/**
 * Общее количество активных пользователей/подписок на сигналы/ запущенных роботов
 * Использование:  manage/dashboard
 */
export const GET_USERS_COUNT = gql`
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

/**
 *  Количество пользователей за определенный период
 *  @period - дата за определенный период
 *  Использование:  manage/dashboard
 */
export const GET_USER_STATS_DURING_PERIOD = gql`
    query getUsersStatsDuringPeriod($period: timestamp) {
        users(where: { created_at: { _gte: $period }, status: { _eq: 1 } }) {
            created_at
        }
    }
`;

/**
 * Список пользователей
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
 *  Общее количество пользователей
 *  Использование:  manage/users
 *  @where -  фильтрация
 */
export const USERS_AGGREGATE = gql`
    query users_aggr($where: users_bool_exp) {
        users_aggregate(where: $where) {
            aggregate {
                count
            }
        }
    }
`;

/**
 * Список роботов
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

/**
 *  Общее количество роботов
 *  Использование:  manage/users
 *  @where -  фильтрация
 */
export const ROBOTS_AGGREGATE = gql`
    query robots_aggr($where: robots_bool_exp) {
        robots_aggregate(where: $where) {
            aggregate {
                count
            }
        }
    }
`;

/**
 * Список подписок на сигналы
 * @where -  фильтрация
 * @order_by - сортировка
 * @limit - для пагинации
 * Использование: manage/user_signals
 */
export const GET_USER_SIGNALS = gql`
    query get_user_signals(
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

/**
 *  Общее значение подписок на сигналы
 *  Использование:  manage/user_signals
 *  @where -  фильтрация
 */
export const USER_SIGNALS_AGGREGATE = gql`
    query user_signals_aggr($where: user_signals_bool_exp) {
        user_signals_aggregate(where: $where) {
            aggregate {
                count
            }
        }
    }
`;

/**
 * Список пользовательских роботов
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
            equity
            settings
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

/**
 *  Общее количество пользовательских роботов
 *  Использование:  manage/user_signals
 *  @where -  фильтрация
 */
export const USER_ROBOTS_AGGREGATE = gql`
    query user_robots_aggr($where: user_robots_bool_exp) {
        user_robots_aggregate(where: $where) {
            aggregate {
                count
            }
        }
    }
`;

/**
 *  Фильтры роботов
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
 *  Фильтры пользовательских роботов
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

/**
 *  Обращение пользователей в саппорт и их последние сообщение из чата
 *  использование: manage/support
 */
export const GET_USERS_SUPPORT_REQUESTS = gql`
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
