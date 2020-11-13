import { ColumnsArraySchema } from "components/pages/ManagePage/utils";
import { capitalize } from "config/utils";
import { string } from "prop-types";

type StatType = { all: number };
type Stats = {
    performance?: { x: number; y: number }[];
    profit?: StatType;
    winRate?: StatType;
    maxDrawdown?: StatType;
    tradesCount?: StatType;
    last_position_exit_date?: string;
};
const getStats = (stats) => {
    const result: Stats = {};
    if (stats && stats.length) {
        const statsObject = stats[0];
        const { statistics, equity_avg } = statsObject;
        result.performance = equity_avg;
        Object.keys(statistics).forEach((key) => {
            result[key] = statistics[key].all;
        });
        result.last_position_exit_date = statsObject.last_position_exit_date;
    }
    return result;
};

const flattenRobotData = (robot) => {
    if (!robot) {
        return {};
    }
    const { robot_settings: settings, ...restProps } = robot;
    const { robot_settings, strategy_settings } = settings;
    return { ...restProps, robot_settings, strategy_settings };
};
export const formatBackTestsData = ({ backtests }: { backtests: any }): any => {
    return backtests.map((backtest) => {
        const { backtest_all_stats, robot, ...restFields } = backtest;
        const backtest_data = getStats(backtest_all_stats);
        const robotData = flattenRobotData(robot);

        return {
            ...restFields,
            robot: robotData,
            ...backtest_data
        };
    });
};

export const getSearchOptions = (query: string) => {
    const queryIsNotEmpty = query && query.trim();
    if (queryIsNotEmpty) {
        return { robot: { code: { _ilike: `%${query}%` } } };
    }
    return null;
};

export const getItemsCount = (data) => data.backtests_aggregate?.aggregate?.count;
