/*settings types*/
import { SortType, SortMethodType, filtersProps, OrderInterface } from "../common/OrderModal/types";

/*sorting settings*/
export const SORT_TYPES_LIST: Array<SortType> = [
    { value: "user_robots_up", label: "User robots ↑" },
    { value: "user_robots_down", label: "User robots ↓" },
    { value: "user_signals_up", label: "User user_robots ↑" },
    { value: "user_signals_down", label: "User user_robots ↓" },
    { value: "user_ex_acc_up", label: "User keys ↑" },
    { value: "user_ex_acc_down", label: "User keys ↓" },
    { value: "created_at_up", label: "User date ↑" },
    { value: "created_at_down", label: "User date ↓" }
];

export const SORT_METHODS: SortMethodType = {
    user_robots_up: { user_robots_aggregate: { count: "asc" } },
    user_robots_down: { user_robots_aggregate: { count: "desc" } },
    user_signals_up: { user_signals_aggregate: { count: "asc" } },
    user_signals_down: { user_signals_aggregate: { count: "desc" } },
    user_ex_acc_up: { user_exchange_accs_aggregate: { count: "asc" } },
    user_ex_acc_down: { user_exchange_accs_aggregate: { count: "desc" } },
    created_at_up: { created_at: { count: "asc" } },
    created_down: { created_at: { count: "desc" } }
};

export const SORT_SETTINGS = {
    sort_methods: SORT_METHODS,
    sort_types: SORT_TYPES_LIST,
    default_sort_name: "user_robots_up"
};

/*FILTERS*/
export const USERS_FILTERS_VARIANTS: any = {
    email: { email: { _is_null: false } },
    telegram: { telegram_id: { _is_null: false } },
    active: { status: { _eq: 1 } },
    notActive: { status: { _eq: 0 } },
    robots: { user_robots: { equity: { _is_null: false } } },
    signals: { user_signals: { equity: { _is_null: false } } },
    keys: { user_exchange_accs: { exchange: { _gt: "0" } } }
};
export const USERS_FILTERS: filtersProps = {
    contacts: {
        label: "Contacts:",
        filters: [
            {
                name: "With Email",
                active: false,
                filterValue: USERS_FILTERS_VARIANTS.email
            },
            {
                name: "With Telegram",
                active: false,
                filterValue: USERS_FILTERS_VARIANTS.telegram
            }
        ]
    },
    statuses: {
        label: "Status:",
        filters: [
            {
                name: "Active",
                active: false,
                filterValue: USERS_FILTERS_VARIANTS.active
            },
            {
                name: "Not Active",
                active: false,
                filterValue: USERS_FILTERS_VARIANTS.notActive
            }
        ]
    },
    user_stats: {
        label: "Stats:",
        filters: [
            {
                name: "With Robots",
                active: false,
                filterValue: USERS_FILTERS_VARIANTS.robots
            },
            {
                name: "With Signals",
                active: false,
                filterValue: USERS_FILTERS_VARIANTS.signals
            },
            {
                name: "With Keys",
                active: false,
                filterValue: USERS_FILTERS_VARIANTS.keys
            }
        ]
    }
};

export const INITIAL_ORDER: OrderInterface = {
    sort: {
        name: null,
        order_by: null
    },
    filters: USERS_FILTERS
};
