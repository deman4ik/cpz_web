import { getStats } from "config/utils";
import dayjs from "libs/dayjs";
import { attachUserStats, parseRobotInfo } from "components/pages/SignalRobotsSearchPage/helpers";

export const formatRobotsData = (data: any) =>
    data.map((robot: any) => {
        const { asset, active, user_robots } = robot;
        const userRobot = user_robots && user_robots[0];
        const stats = getStats(robot);

        const res = parseRobotInfo(stats, robot);

        res.active = active ? dayjs.utc(active).fromNow(true) : active;

        if (userRobot) {
            res.user_robots.status = userRobot.status;
            res.user_robots.id = userRobot.id;
            res.volume = `${userRobot.user_robot_settings.user_robot_settings.volume} ${asset}`;
            res.started_at = userRobot.started_at ? dayjs.utc(userRobot.started_at).fromNow(true) : 0;

            attachUserStats(res, userRobot);
        }

        return res;
    });
