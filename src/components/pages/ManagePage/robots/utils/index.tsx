// utils
import { getStats, getVolumeType, getVolumeWithUnit } from "config/utils";

// constants
import { ROBOTS_AVAILABLE_CODES } from "config/constants";

export const formatRobots = ({ robots }: { robots: any }): any => {
    return robots.map((robot) => {
        const {
            name,
            id,
            status,
            robot_settings: [settings],
            available,
            signals,
            trading,
            user_robots_aggregate,
            user_signals_aggregate,
            currency,
            asset
        } = robot;
        const { equity, profit, winRate, maxDrawdown, tradesCount } = getStats(robot);

        const { robot_settings, strategy_settings } = settings;

        return {
            name,
            id,
            status,
            volume: getVolumeWithUnit(robot_settings, { currency, asset }),
            volumeType: getVolumeType(robot_settings),
            available: ROBOTS_AVAILABLE_CODES[available],
            performance: equity,
            maxDrawdown,
            profit,
            tradesCount,
            winRate,
            signals,
            trading,
            user_robots: user_robots_aggregate.aggregate.count,
            user_signals: user_signals_aggregate.aggregate.count,
            strategy_settings
        };
    });
};

export const getSearchOptions = (value: string) => ({ name: { _ilike: `%${value}%` } });
