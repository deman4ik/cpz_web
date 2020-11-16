import { useEffect, useMemo, useState } from "react";
import { ITEMS_PER_PAGE_OPTIONS } from "components/pages/ManagePage/common/constants";

export const useTableFilters = ({ getSearchOptions }) => {
    const [filters, setFilters] = useState({
        limit: ITEMS_PER_PAGE_OPTIONS[0],
        orderBy: null,
        where: getSearchOptions ? getSearchOptions("") : null
    });

    useEffect(() => {
        setFilters((prev) => ({ ...prev, where: getSearchOptions && getSearchOptions("") }));
    }, [getSearchOptions]);

    const { limit } = filters;
    const [pageIndex, setPageIndex] = useState(0);

    const offset = useMemo(() => limit * pageIndex, [limit, pageIndex]);

    const getPageCount = (itemsCount: number) => Math.ceil(itemsCount / limit);

    return {
        filters,
        setFilters,
        pageIndex,
        setPageIndex,
        getPageCount,
        offset
    };
};
