/*settings types*/
import { SortType, SortMethodType, filtersProps, OrderInterface } from "../common/OrderModalInner/types";

export const SORT_TYPES_LIST: Array<SortType> = [
    { value: "created_at_up", label: "Created ↑" },
    { value: "created_at_down", label: "Created ↓" },
    { value: "started_at_up", label: "Started ↑" },
    { value: "started_at_down", label: "Started ↓" },
    { value: "statistics_up", label: "Statistics ↑" },
    { value: "statistics_down", label: "Statistics ↓" }
];

export const SORT_METHODS: SortMethodType = {
    created_at_up: { created_at: "asc" },
    created_at_down: { created_at: "desc" },
    started_at_up: { started_at: "asc" },
    started_at_down: { started_at: "desc" },
    statistics_up: { statistics: "asc" },
    statistics_down: { statistics: "desc" }
};

export const SORT_SETTINGS = {
    sort_methods: SORT_METHODS,
    sort_types: SORT_TYPES_LIST,
    default_sort_name: "created_at_up"
};

/*Filters*/
const filterMapper = (item) => ({ name: item, active: false, filterValue: item });

export const FILTERS: filtersProps = {
    exchange: {
        label: "Exchange",
        filters: [
            {
                name: "Binance Futures",
                active: false,
                filterValue: "binance_futures"
            },
            {
                name: "Bitfinex",
                active: false,
                filterValue: "bitfinex"
            },
            {
                name: "Kraken",
                active: false,
                filterValue: "kraken"
            }
        ]
    },
    asset: {
        label: "Asset",
        filters: [
            "BTC",
            "NEO",
            "ZEC",
            "DASH",
            "ETH",
            "EOS",
            "XRP",
            "TRX",
            "LTC",
            "BCH",
            "ATOM",
            "BAT",
            "XMR",
            "XTZ",
            "XLM"
        ].map(filterMapper)
    }
};

export const INITIAL_ORDER: OrderInterface = {
    sort: {
        name: null,
        order_by: null
    },
    filters: FILTERS
};
