//types
import { StatsInterface } from "../components/UserStats/StatsItem";
import { dataInterface } from "../hooks/useFetchTimestamp";

/*additional*/
const PERIODS_TEXTS = {
    today: "Today",
    dayAgo: "Yesterday",
    weekAgo: "Week",
    monthAgo: "Month"
};

/**
 * Функция обработки данных тотал
 */
export const formatTotalUsers = (data: any): Array<StatsInterface> => {
    const total = { title: "Total", count: data.length };
    const signals = {
        title: "With Signals",
        count: data.filter(({ user_signals }) => Boolean(user_signals.length)).length
    };
    const robots = {
        title: "With Robots",
        count: data.filter(({ user_robots }) => Boolean(user_robots.length)).length
    };
    return [total, signals, robots];
};

/**
 * Функция обработки данных по периодам
 */
export const formatPeriodUsers = (periods: Array<dataInterface>) =>
    periods.map(({ name, data }) => ({
        title: PERIODS_TEXTS[name],
        count: data.length,
        plus: Boolean(data.length)
    }));
