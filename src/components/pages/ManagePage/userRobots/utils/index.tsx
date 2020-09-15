/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import React from "react";

// utils
import { formatDate } from "config/utils";
import { defineProperty } from "../../utils";

export const formatData = ({ user_robots }) => {
    return user_robots.map((entry) => {
        const row = {};
        defineProperty(row, "created_at", entry?.created_at ? formatDate(entry?.created_at) : "");
        defineProperty(row, "stopped_at", entry?.stopped_at ? formatDate(entry?.stopped_at) : "");
        defineProperty(row, "performance", {
            performance: entry?.equity?.changes || [],
            profit: entry?.equity?.profit || 0
        });
        defineProperty(row, "lastProfit", entry?.equity?.lastProfit);
        defineProperty(row, "maxDrawdown", entry?.equity?.maxDrawdown);
        defineProperty(row, "profit", entry?.equity?.profit);
        defineProperty(row, "tradesCount", entry?.equity?.tradesCount);
        defineProperty(row, "winRate", entry?.equity?.winRate);
        defineProperty(row, "robot_code", entry?.robot?.name);
        defineProperty(row, "robot_id", entry?.robot?.id);
        defineProperty(row, "volume", entry?.settings?.volume);
        defineProperty(row, "user_name", entry?.user?.name);
        defineProperty(row, "user_id", entry?.user?.id);
        defineProperty(row, "status", entry?.status);

        return row;
    });
};

export const getSearchOptions = (value: string) => ({
    _or: [{ user: { name: { _ilike: `%${value}%` } } }, { robot: { name: { _ilike: `%${value}%` } } }]
});

export const aggregateRobotsFilters = (filtersObject: filtersProps | undefined) => {
    let where = null;
    if (filtersObject) {
        Object.keys(filtersObject).forEach((key) => {
            const filters = filtersObject[key].filters
                .filter(({ active }) => Boolean(active))
                .map(({ filterValue }) => filterValue);
            if (filters.length) {
                where = { ...where, [key]: { _in: filters } };
            }
        });
    }
    return where;
};
