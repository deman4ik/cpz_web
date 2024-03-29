//types
import { getColorForMoney, valueWithSign } from "config/utils";
import React from "react";
import { StatsInterface } from "../components/UserStats/StatsItem";
import { dataInterface } from "../hooks/useFetchTimestamp";

/*additional*/
const PERIODS_TEXTS = {
    today: "Today",
    dayAgo: "Yesterday",
    weekAgo: "Week",
    monthAgo: "Month"
};

const TOTAL_USERS_TITLES = {
    usersTotal: "Total",
    usersWithRobots: "With Robots",
    usersWithSignals: "With Signals",
    usersWithSubs: "With Subs"
};

/**
 * Функция обработки данных тотал
 */
export const formatTotalUsers = (data): Array<StatsInterface> => {
    return Object.keys(data).map((key) => ({
        title: TOTAL_USERS_TITLES[key],
        value: data[key].aggregate.count
    }));
};

/**
 * Функция обработки данных по периодам
 */
export const formatPeriodUsers = (periods: Array<any>) =>
    periods.map(({ name, data }) => ({
        title: PERIODS_TEXTS[name],
        value: <span style={{ color: getColorForMoney(data) }}>{valueWithSign(data)}</span>
    }));
