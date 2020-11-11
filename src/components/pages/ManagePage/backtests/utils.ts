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
        result.profit = statistics.netProfit.all;
        result.winRate = statistics.winRate.all;
        result.maxDrawdown = statistics.maxDrawdown.all;
        result.tradesCount = statistics.tradesCount.all;
        result.last_position_exit_date = statsObject.last_position_exit_date;
    }
    return result;
};

export const formatBackTestsData = ({ backtests }: { backtests: any }): any => {
    return backtests.map((backtest) => {
        const { backtest_all_stats, robot, ...restFields } = backtest;
        const backtest_data = getStats(backtest_all_stats);

        return {
            ...restFields,
            robot: robot || {},
            ...backtest_data
        };
    });
};
