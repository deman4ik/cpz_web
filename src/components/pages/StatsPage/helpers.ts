import { getRobotStatistic } from "components/ui/PerformanceTab/helpers";
import dayjs from "libs/dayjs";
import { exchangeName } from "config/utils";
import { CheckedFilters } from "./types";
// utils
import uniqueArrayByfield from "utils/uniqueArrayByfield";

export const getFormatData = (stats) => {
    if (!stats?.equity || !stats?.statistics) return { chartData: null, robotStatistic: null };
    const chartData = stats.equity.map((pos) => ({
        time: dayjs.utc(pos.x / 1000).valueOf(),
        value: pos.y
    }));
    return {
        chartData: uniqueArrayByfield(chartData, "time"),
        robotStatistic: getRobotStatistic(stats.statistics)
    };
};

export const getSubTitle = (checkedFilters: CheckedFilters) =>
    Object.keys(checkedFilters)
        .map((filter) => (filter ? exchangeName(checkedFilters[filter]) : ""))
        .join(" ");

export const getLabelCombinations = (filters) =>
    filters.reduce(
        (acc, item) => {
            Object.keys(item).forEach((key) => {
                if (key !== "__typename" && item[key] && !acc[key].includes(item[key])) {
                    acc[key].push(item[key]);
                }
            });
            return acc;
        },
        { exchange: [], asset: [] }
    );

export const getQueueType = (displayType: string) => ({
    _eq: displayType === "signals" ? "signal" : "userRobot"
});

export const extractRoute = (route: string): string => {
    return route
        .split("/")
        .filter((i) => i)
        .slice(0, 2)
        .join("/");
};

export const getVariablesFrom = (params) =>
    Object.entries(params).reduce((acc, v) => {
        const [key, value] = v;
        if (!value) return acc;
        acc[key] = value;
        return acc;
    }, {});
