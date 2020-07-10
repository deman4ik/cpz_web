// types
import { filtersVariantType, filtersProps } from "./types";

/**
 * Утилита обработки active фильтров
 * Возвращает объект с фильтрами  у которых статус active
 * @param filters - фильтры
 */
export const aggregateOrderModalFilters = (filters: filtersProps): filtersVariantType | null => {
    let where = null;
    Object.keys(filters).forEach((key) => {
        filters[key].filters.forEach(({ active, filterValue }) => {
            if (active) where = { ...where, ...filterValue };
        });
    });

    return where;
};
