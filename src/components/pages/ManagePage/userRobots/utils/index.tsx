import { formatDate, getStats, getUserRobotSettings, getVolumeType, getVolumeWithUnit } from "config/utils";

export const formatUserRobots = ({ user_robots }: { user_robots: any }): any => {
    return user_robots.map((user_robot) => {
        const { created_at, stopped_at, status, user, robot } = user_robot;
        const { equity, profit, winRate, maxDrawdown, tradesCount } = getStats(user_robot);
        const { asset, currency, name: robot_code, id: robot_id } = robot;
        const { name: user_name, id: user_id } = user;
        const settings = getUserRobotSettings(user_robot);

        return {
            created_at: formatDate(created_at),
            stopped_at: formatDate(stopped_at),
            performance: equity,
            maxDrawdown,
            profit,
            tradesCount,
            winRate,
            volume: getVolumeWithUnit(settings, { asset, currency }),
            volumeType: getVolumeType(settings),
            status,
            robot_code,
            robot_id,
            user_name,
            user_id
        };
    });
};

export const getSearchOptions = (value: string) => ({
    _or: [{ user: { name: { _ilike: `%${value}%` } } }, { robot: { name: { _ilike: `%${value}%` } } }]
});
