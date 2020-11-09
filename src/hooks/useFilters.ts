/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import { useState, useEffect } from "react";
import { CheckedFilters } from "components/pages/StatsPage/types";
import { ParsedUrlQuery } from "querystring";

const initialState = { exchange: null, asset: null };
export const useFilters = ({ exchange, asset }: ParsedUrlQuery) => {
    const [checkedFilters, setCheckedFilters] = useState<CheckedFilters>(initialState);
    const [selectedFilter, setSelectedFilter] = useState<CheckedFilters>(initialState);

    const checkFilterButton = (label: string, item: string) => {
        if (checkedFilters[label] === item) {
            setCheckedFilters((prev) => ({ ...prev, [label]: null }));
        } else {
            setCheckedFilters((prev) => ({ ...prev, [label]: item }));
        }
    };

    useEffect(() => {
        const filters = {
            exchange: exchange === "null" || !exchange ? null : (exchange as string),
            asset: asset === "null" || !asset ? null : (asset as string)
        };

        setCheckedFilters(filters);
        setSelectedFilter(filters);
    }, [exchange, asset]);

    const clearFilters = () => {
        setCheckedFilters(initialState);
    };

    const confirmSelectedFilters = () => {
        if (selectedFilter.asset !== checkedFilters.asset || selectedFilter.exchange !== checkedFilters.exchange) {
            setSelectedFilter(checkedFilters);
        } else {
            checkFilterButton(selectedFilter.exchange, selectedFilter.asset);
        }
    };

    return {
        checkedFilters,
        clearFilters,
        checkFilterButton,
        selectedFilter,
        confirmSelectedFilters
    };
};
