// types
import { filtersVariantType, filtersProps, FiltersSchemeInterface } from "./types";

/**
 * Утилита обработки active фильтров
 * Возвращает объект с фильтрами  у которых статус active
 * @param filters - фильтры
 */
export const aggregateOrderModalFilters = (filters: filtersProps): filtersVariantType | null => {
    let where = null;
    Object.keys(filters).forEach((key) => {
        filters[key].filters.forEach(({ active, filterValue }) => {
            if (active && filterValue instanceof Object) where = { ...where, ...filterValue };
        });
    });

    return where;
};

/**
 *  Утилита формирует данные для фильтров из  запроса
 * @param scheme - схема фильтров
 * @param data - данные запроса
 */
export const formatFilters = (scheme: Array<FiltersSchemeInterface>, data: Array<any>): filtersProps => {
    const formatedFilters: any = {};
    scheme.forEach(({ key, label, mapper }) => {
        const filtersValues = [...new Set(data.map((item) => item[key]))];
        const filters = mapper
            ? filtersValues.map(mapper)
            : filtersValues.map((item) => ({ name: item, active: false, filterValue: item }));
        formatedFilters[key] = {
            label,
            filters
        };
    });

    return formatedFilters;
};
