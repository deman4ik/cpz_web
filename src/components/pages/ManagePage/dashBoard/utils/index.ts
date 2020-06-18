//types
import { StatsInterface } from "../components/StatsItem";

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
