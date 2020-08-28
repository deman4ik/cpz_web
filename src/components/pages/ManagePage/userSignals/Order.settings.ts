/*settings types*/
import { SortType, SortMethodType, OrderInterface } from "../common/OrderModalInner/types";

/*sorting settings*/
export const SORT_TYPES_LIST: Array<SortType> = [
    { value: "signals_subscribed_up", label: "Signals subscribed ↑" },
    { value: "signals_subscribed_down", label: "Signals subscribed ↓" }
];

export const SORT_METHODS: SortMethodType = {
    signals_subscribed_up: { subscribed_at: "asc" },
    signals_subscribed_down: { subscribed_at: "desc" }
};

export const SORT_SETTINGS = {
    sort_methods: SORT_METHODS,
    sort_types: SORT_TYPES_LIST,
    default_sort_name: "signals_subscribed_up"
};

export const INITIAL_ORDER: OrderInterface = {
    sort: null
};
