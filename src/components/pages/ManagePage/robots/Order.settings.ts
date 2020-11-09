/*settings types*/
import { SortType, SortMethodType, OrderInterface, FiltersSchemeInterface } from "../common/OrderModal/types";
/*filters mappers*/
import { underscoreMapper, timeframeMapper, tradingMapper } from "../common/OrderModal/dataMappers";

export const SORT_TYPES_LIST: Array<SortType> = [
    { value: "robots_statistics_up", label: "Robots statistic ↑" },
    { value: "robots_statistics_down", label: "Robots statistic ↓" },
    { value: "user_robots_up", label: "User robots ↑" },
    { value: "user_robots_down", label: "User robots ↓" },
    { value: "user_signals_up", label: "User user_robots ↑" },
    { value: "user_signals_down", label: "User user_robots ↓" }
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

/*Filters map scheme*/
export const FILTERS_SCHEME: Array<FiltersSchemeInterface> = [
    {
        key: "exchange",
        label: "Exchange",
        mapper: underscoreMapper
    },
    {
        key: "asset",
        label: "Asset"
    },
    {
        key: "currency",
        label: "Currency"
    },
    {
        key: "strategy",
        label: "Strategy",
        mapper: underscoreMapper
    },
    {
        key: "timeframe",
        label: "Timeframe",
        mapper: timeframeMapper
    },
    {
        key: "trading",
        label: "Trading",
        mapper: tradingMapper
    },
    {
        key: "status",
        label: "Status"
    }
];

/*Initial order state*/
export const INITIAL_ORDER: OrderInterface = {
    sort: {
        name: null,
        order_by: null
    }
};
