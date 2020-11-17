import { PageType } from "config/types";
import { ROBOTS_TOTAL_PERFORMANCE_WITH_STATS, USER_ROBOTS_TOTAL_PERFORMANCE_WITH_STATS } from "graphql/signals/queries";

export const mapRoutesToDisplayTypes = {
    "manage/robots": "manageRobotsStats",
    "manage/user_robots": "manageUserRobotsStats",
    "manage/backtest": "manageBackTest"
};

export const mapQueriesToRoutes = {
    manageRobotsStats: ROBOTS_TOTAL_PERFORMANCE_WITH_STATS,
    manageUserRobotsStats: USER_ROBOTS_TOTAL_PERFORMANCE_WITH_STATS
};

export const entity = {
    [PageType.manageRobotsStats]: "Robots",
    [PageType.manageUserRobotsStats]: "User Robots"
};
