export type ButtonName = {
    key: string;
    label: string;
};

export type FilterData = {
    asset: ButtonName[];
    exchange: ButtonName[];
    timeframe: ButtonName[];
};

export type CheckedFilter = {
    asset: string[];
    exchange: string[];
    timeframe: string[];
};

export enum TabTypeFilters {
    filters,
    orders
}
