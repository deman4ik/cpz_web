/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import { formatDate, getStats } from "config/utils";
import { defineProperty } from "../../utils";

export const formatData = ({ user_robots }) => {
    return user_robots.map((robot) => {
        const row = {};
        defineProperty(row, "created_at", robot?.created_at ? formatDate(robot?.created_at) : "");
        defineProperty(row, "stopped_at", robot?.stopped_at ? formatDate(robot?.stopped_at) : "");

        const { equity, profit, winRate, maxDrawdown, tradesCount } = getStats(robot);

        defineProperty(row, "performance", {
            performance: equity,
            profit
        });
        defineProperty(row, "lastProfit", robot?.stats?.lastProfit);
        defineProperty(row, "maxDrawdown", maxDrawdown);
        defineProperty(row, "profit", profit);
        defineProperty(row, "tradesCount", tradesCount);
        defineProperty(row, "winRate", winRate);
        defineProperty(row, "robot_code", robot?.robot?.name);
        defineProperty(row, "robot_id", robot?.robot?.id);
        defineProperty(row, "volume", robot?.settings?.volume);
        defineProperty(row, "user_name", robot?.user?.name);
        defineProperty(row, "user_id", robot?.user?.id);
        defineProperty(row, "status", robot?.status);

        return row;
    });
};

export const getSearchOptions = (value: string) => ({
    _or: [{ user: { name: { _ilike: `%${value}%` } } }, { robot: { name: { _ilike: `%${value}%` } } }]
});
