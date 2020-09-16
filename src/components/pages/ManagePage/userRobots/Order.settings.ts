/*filters mappers*/
import { underscoreMapper } from "../common/OrderModal/dataMappers";
/*settings types*/
import { SortType, SortMethodType, OrderInterface, FiltersSchemeInterface } from "../common/OrderModal/types";

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
export const FILTERS_SCHEME: Array<FiltersSchemeInterface> = [
    {
        key: "exchange",
        label: "Exchange",
        mapper: underscoreMapper
    },
    {
        key: "asset",
        label: "Asset"
    }
];

export const INITIAL_ORDER: OrderInterface = {
    sort: {
        name: null,
        order_by: null
    }
};
