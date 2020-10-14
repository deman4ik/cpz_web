/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
// utils
import { defineProperty } from "../../utils";

// constants
import { ROBOTS_AVAILABLE_CODES } from "config/constants";
import { getStats } from "config/utils";

export const formatData = ({ robots }) => {
    return robots.map((robot) => {
        const row = {};
        defineProperty(row, "name", robot.name);
        defineProperty(row, "id", robot.id);
        defineProperty(row, "status", robot.status);

        defineProperty(row, "requiredHistoryMaxBars", robot.settings?.requiredHistoryMaxBars);
        defineProperty(row, "volume", robot.settings?.volume);

        defineProperty(row, "smaSize", robot.settings?.strategyParameters?.smaSize);
        defineProperty(row, "distInit", robot.settings?.strategyParameters?.distInit);
        defineProperty(row, "lookback", robot.settings?.strategyParameters?.lookback);
        defineProperty(row, "atrPeriod", robot.settings?.strategyParameters?.atrPeriod);
        defineProperty(row, "adjustment", robot.settings?.strategyParameters?.adjustment);

        defineProperty(row, "adx", robot.settings?.strategyParameters?.adx);
        defineProperty(row, "adxHigh", robot.settings?.strategyParameters?.adxHigh);
        defineProperty(row, "adxPeriod", robot.settings?.strategyParameters?.adxPeriod);

        defineProperty(row, "trailBars", robot.settings?.strategyParameters?.trailBars);
        defineProperty(row, "tick", robot.settings?.strategyParameters?.tick);
        defineProperty(row, "ratio", robot.settings?.strategyParameters?.ratio);
        defineProperty(row, "seriesSize", robot.settings?.strategyParameters?.seriesSize);

        defineProperty(row, "orderStopLoss", robot.settings?.strategyParameters?.orderStopLoss);
        defineProperty(row, "orderTakeProfit", robot.settings?.strategyParameters?.orderTakeProfit);

        defineProperty(row, "available", ROBOTS_AVAILABLE_CODES[robot.available]);

        const { equity, profit, winRate, maxDrawdown, tradesCount } = getStats(robot);

        defineProperty(row, "performance", {
            performance: equity,
            profit
        });
        defineProperty(row, "maxDrawdown", maxDrawdown);
        defineProperty(row, "profit", profit);
        defineProperty(row, "tradesCount", tradesCount);
        defineProperty(row, "winRate", winRate);

        defineProperty(row, "signals", robot.signals);
        defineProperty(row, "trading", robot.trading);

        defineProperty(row, "user_robots", robot.user_robots_aggregate.aggregate.count);
        defineProperty(row, "user_signals", robot.user_signals_aggregate.aggregate.count);

        return row;
    });
};

export const getSearchOptions = (value: string) => ({ name: { _ilike: `%${value}%` } });
