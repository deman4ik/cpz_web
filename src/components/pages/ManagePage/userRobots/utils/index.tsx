import { formatDate, getStats } from "config/utils";

export const formatUserRobots = ({ user_robots }: { user_robots: any }): any => {
    return user_robots.map((robot) => {
        console.log(robot);
        const { equity, profit, winRate, maxDrawdown, tradesCount } = getStats(robot);

        return {
            created_at: formatDate(robot?.created_at),
            stopped_at: formatDate(robot?.stopped_at),

            performance: equity,
            maxDrawdown,
            profit,
            tradesCount,
            winRate,
            robot_code: robot?.robot?.name,
            robot_id: robot?.robot?.id,
            volume: robot?.user_robot_settings?.user_robot_settings.volume,
            user_name: robot?.user?.name,
            user_id: robot?.user?.id,
            status: robot?.status
        };
    });
};

export const getSearchOptions = (value: string) => ({
    _or: [{ user: { name: { _ilike: `%${value}%` } } }, { robot: { name: { _ilike: `%${value}%` } } }]
});
