import { SortType, SortMethodType, OrderInterface } from "../common/OrderModalInner/types";

export const SORT_TYPES_LIST: Array<SortType> = [
    { value: "messages_up", label: "Date messages ↑" },
    { value: "messages_down", label: "Date messages ↓" }
];

export const SORT_METHODS: SortMethodType = {
    messages_up: "asc",
    messages_down: "desc"
};

export const SORT_SETTINGS = {
    sort_methods: SORT_METHODS,
    sort_types: SORT_TYPES_LIST,
    default_sort_name: "user_robots_up"
};

export const INITIAL_ORDER: OrderInterface = {
    sort: {
        name: null,
        order_by: null
    }
};
