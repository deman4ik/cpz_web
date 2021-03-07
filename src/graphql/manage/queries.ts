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
        usersWithSubs: user_subs_aggregate(where: { status: { _in: ["trial", "started"] } }, distinct_on: [user_id]) {
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
export const GET_NEW_USERS_IN_PEROID = gql`
    query get_new_users($period: timestamp) {
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
            user_subs_aggregate(where: { status: { _in: ["trial", "started"] } }) {
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
export const ALL_USERS_AGGREGATE = gql`
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

export const GET_ROBOTS_BY_ID = gql`
    query get_robot_names_by_ids($where: robots_bool_exp) {
        robots(where: $where) {
            id
            available
            name
        }
    }
`;
/**
 *  Общее количество роботов
 *  Использование:  manage/users
 *  @where -  фильтрация
 */
export const ALL_ROBOTS_AGGREGATE = gql`
    query get_all_robots_aggr($where: robots_bool_exp) {
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
                asset
                currency
            }
            user {
                name
                id
            }
            subscribed_at
            user_signal_settings {
                signal_settings
            }
        }
    }
`;

/**
 *  Общее значение подписок на сигналы
 *  Использование:  manage/user_signals
 *  @where -  фильтрация
 */
export const USER_SIGNALS_AGGREGATE = gql`
    query get_user_signals_aggr($where: user_signals_bool_exp) {
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
                asset
                currency
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

/**
 *  Фильтры пользовательских роботов
 *  Использование:  manage/user_robots
 */
export const USER_ROBOTS_FILTERS = gql`
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
export const SUPPORT_REQUESTS = gql`
    query get_support_requests(
        $where: v_support_messages_bool_exp
        $limit: Int
        $offset: Int
        $order_by: [v_support_messages_order_by!]
    ) {
        support_requests: v_support_messages(where: $where, limit: $limit, offset: $offset, order_by: $order_by) {
            user {
                id
                name
            }
            messages_count
            lastMessage {
                timestamp
                data
            }
        }
    }
`;

export const SUPPORT_REQUESTS_AGGREGATE = gql`
    query get_users_support_requests_aggregate($where: v_support_messages_bool_exp) {
        v_support_messages_aggregate(where: $where) {
            aggregate {
                count
            }
        }
    }
`;

export const DEAD_LETTERS = gql`
    query get_dead_letters(
        $where: dead_letters_bool_exp
        $limit: Int
        $offset: Int
        $order_by: [dead_letters_order_by!]
    ) {
        dead_letters(where: $where, limit: $limit, offset: $offset, order_by: $order_by) {
            created_at
            data
            event_id
            id
            processed
            resend
            timestamp
            topic
            type
            updated_at
        }
    }
`;

export const DEAD_LETTERS_AGGREGATE = gql`
    query get_dead_letters_aggregate($where: dead_letters_bool_exp) {
        dead_letters_aggregate(where: $where) {
            aggregate {
                count
            }
        }
    }
`;

export const ERROR_EVENTS = gql`
    query get_error_events(
        $where: error_events_bool_exp
        $limit: Int
        $offset: Int
        $order_by: [error_events_order_by!]
    ) {
        error_events(where: $where, limit: $limit, offset: $offset, order_by: $order_by) {
            created_at
            data
            event_id
            id
            timestamp
            topic
            type
            updated_at
        }
    }
`;

export const ERROR_EVENTS_AGGREGATE = gql`
    query get_error_events_aggregate($where: error_events_bool_exp) {
        error_events_aggregate(where: $where) {
            aggregate {
                count
            }
        }
    }
`;
