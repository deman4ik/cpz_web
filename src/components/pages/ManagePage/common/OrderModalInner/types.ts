/*filters types*/
export type filtersVariantType = (val: string) => { [key: string]: any } | { [key: string]: any };
export type filterItemType = {
    name: string;
    active: boolean;
    filterValue: string | filtersVariantType;
};
export interface filtersProps {
    [key: string]: {
        label: string;
        filters: Array<filterItemType>;
    };
}
/*sorting types*/
export type SortType = { value: string; label: string };
export type SortMethodType = { [key: string]: { [key: string]: any } };

/*initial order interface*/
export interface OrderInterface {
    sort: {
        name: string | null;
        order_by: null | SortMethodType;
    };
    filters: filtersProps;
}
