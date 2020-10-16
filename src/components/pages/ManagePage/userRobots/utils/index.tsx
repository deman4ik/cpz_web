import { formatDate, getStats } from "config/utils";

export const formatUserRobots = ({ user_robots }: { user_robots: any }): any => {
    return user_robots.map((user_robot) => {
        const { created_at, stopped_at, status, user_robot_settings, user, robot } = user_robot;
        const { equity, profit, winRate, maxDrawdown, tradesCount } = getStats(user_robot);

        return {
            created_at: formatDate(created_at),
            stopped_at: formatDate(stopped_at),

            performance: equity,
            maxDrawdown,
            profit,
            tradesCount,
            winRate,
            volume: user_robot_settings?.user_robot_settings.volume,
            robot_code: robot?.name,
            robot_id: robot?.id,
            user_name: user?.name,
            user_id: user?.id,
            status
        };
    });
};

export const getSearchOptions = (value: string) => ({
    _or: [{ user: { name: { _ilike: `%${value}%` } } }, { robot: { name: { _ilike: `%${value}%` } } }]
});
