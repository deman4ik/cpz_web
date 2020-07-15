/*settings types*/
import { SortType, SortMethodType, filtersProps, OrderInterface } from "../common/OrderModalInner/types";

export const SORT_TYPES_LIST: Array<SortType> = [
    { value: "robots_statistics_up", label: "Robots statistic ↑" },
    { value: "robots_statistics_down", label: "Robots statistic ↓" },
    { value: "user_robots_up", label: "User robots ↑" },
    { value: "user_robots_down", label: "User robots ↓" },
    { value: "user_signals_up", label: "User signals ↑" },
    { value: "user_signals_down", label: "User signals ↓" }
];
export const SORT_METHODS: SortMethodType = {
    robots_statistics_up: { equity: "asc" },
    robots_statistics_down: { equity: "desc" },
    user_robots_up: { user_robots_aggregate: { count: "asc" } },
    user_robots_down: { user_robots_aggregate: { count: "desc" } },
    user_signals_up: { user_signals_aggregate: { count: "asc" } },
    user_signals_down: { user_signals_aggregate: { count: "desc" } }
};
export const SORT_SETTINGS = {
    sort_methods: SORT_METHODS,
    sort_types: SORT_TYPES_LIST,
    default_sort_name: "robots_statistics"
};

/*FILTERS*/
const filterMapper = (item) => ({ name: item, active: false, filterValue: item });

const timeFrameFormat = {
    // Todo rename to constant name
    1: "1m",
    5: "5m",
    15: "15m",
    30: "30m",
    60: "1h",
    120: "2h",
    240: "4h",
    480: "8h",
    720: "12h",
    1440: "1d"
};

export const USERS_FILTERS: filtersProps = {
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
    },
    currency: {
        label: "Currency",
        filters: ["USD", "USDT"].map(filterMapper)
    },
    strategy: {
        label: "Strategy",
        filters: ["Parabolic", "Breakout", "Breakout_v2", "T2_Trend_Friend", "Channels"].map((item) => ({
            name: item.replace(/_/g, " "),
            active: false,
            filterValue: item.toLowerCase()
        }))
    },
    timeframe: {
        label: "Timeframe",
        filters: Object.keys(timeFrameFormat).map((key) => ({
            name: timeFrameFormat[key],
            active: false,
            filterValue: key
        }))
    },
    trading: {
        label: "Tading",
        filters: [
            {
                name: "Active",
                active: false,
                filterValue: "true"
            },
            {
                name: "Not Active",
                active: false,
                filterValue: "false"
            }
        ]
    },
    status: {
        label: "Status",
        filters: ["Stopped", "Started"].map((item) => ({ name: item, active: false, filterValue: item.toLowerCase() }))
    }
};

export const INITIAL_ORDER: OrderInterface = {
    sort: {
        name: null,
        order_by: null
    },
    filters: USERS_FILTERS
};
