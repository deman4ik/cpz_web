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
export type SortMethodType = { [key: string]: string | { [key: string]: any } };

/*initial order interface*/
export interface OrderInterface {
    sort: {
        name: string | null;
        order_by: null | string | SortMethodType;
    };
    filters?: filtersProps;
}

/*filter mapper*/
export type filterMapperSignature = (item: string) => filterItemType;

/*filter scheme*/
export interface FiltersSchemeInterface {
    label: string;
    key: string;
    mapper?: filterMapperSignature;
}
