import { getVolume } from "config/utils";

type StatType = { all: number };
type Stats = {
    performance?: { x: number; y: number }[];
    profit?: StatType;
    winRate?: StatType;
    maxDrawdown?: StatType;
    tradesCount?: StatType;
};
const getStats = (backtest) => {
    const { backtest_stats } = backtest;
    const result: Stats = {};
    if (backtest_stats && backtest_stats.length) {
        const firstStats = backtest_stats[0];
        const { statistics, equity_avg } = firstStats
        result.performance = equity_avg;
        result.profit = statistics.netProfit.all;
        result.winRate = statistics.winRate.all;
        result.maxDrawdown = statistics.maxDrawdown.all;
        result.tradesCount = statistics.tradesCount.all;
    }
    return result;
};

export const formatBackTestsData = ({ backtests }: { backtests: any }): any => {
    return backtests.map((backtest) => {
        const {
            asset,
            timeframe,
            exchange,
            strategy,
            id,
            robot_id,
            status,
            backtest_settings: [settings],
        } = backtest;
        const { performance, profit, winRate, maxDrawdown, tradesCount } = getStats(backtest);
        const { robot_settings, strategy_settings } = settings || {};

        return {
            asset,
            id,
            timeframe,
            exchange,
            strategy,
            robot_id,
            status,
            volume: getVolume(robot_settings),
            performance,
            maxDrawdown,
            profit,
            tradesCount,
            winRate,
            ...strategy_settings
        };
    });
};
