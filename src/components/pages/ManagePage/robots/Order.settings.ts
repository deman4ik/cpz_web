/*settings types*/
import {
    SortType,
    SortMethodType,
    filtersProps,
    OrderInterface
} from "../common/OrderModalInner/types";

export const SORT_TYPES_LIST: Array<SortType> = [{ value: "robots_statistics", label: "Robots statistic" }];
export const SORT_METHODS: SortMethodType = {
    robots_statistics: { equity: "desc" }
};
export const SORT_SETTINGS = {
    sort_methods: SORT_METHODS,
    sort_types: SORT_TYPES_LIST,
    default_sort_name: "robots_statistics"
};

/*FILTERS*/
export const USERS_FILTERS_VARIANTS: any = {
    exchange: (value: string) => ({ exchange: { _eq: value } })
};

export const USERS_FILTERS: filtersProps = {
    exchange: {
        label: "Exchange",
        filters: [
            {
                name: "Binance Futures",
                active: false,
                filterValue: USERS_FILTERS_VARIANTS.exchange("binance_futures")
            },
            {
                name: "Bitfinex",
                active: false,
                filterValue: USERS_FILTERS_VARIANTS.exchange("bitfinex")
            },
            {
                name: "Kraken",
                active: false,
                filterValue: USERS_FILTERS_VARIANTS.exchange("kraken")
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
