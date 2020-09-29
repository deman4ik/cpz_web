import gql from "graphql-tag";
import dayjs from "libs/dayjs";
import { USER_ROBOTS, USER_ROBOTS_BY_STATS, ROBOT_INFO_FOR_USER_ROBOT } from "../robots/queries";

export const deleteRobot = (_root: any, variables: any, context: any) => {
    const robotsStatsExist = Object.keys(context.cache.data.data.ROOT_QUERY).find(
        (el) => el.indexOf("v_robots_stats_robots") === 0
    );
    if (robotsStatsExist) {
        const idRobots = context.getCacheKey({
            __typename: "robots",
            id: variables.robot.id
        });
        const fragmentDeleteRobots = gql`
            fragment deleteRobotsRow on robots {
                user_robots {
                    status
                    id
                    settings
                    started_at
                    equity
                }
            }
        `;
        const row = context.cache.readFragment({
            fragment: fragmentDeleteRobots,
            id: idRobots
        });
        context.cache.writeFragment({
            fragment: fragmentDeleteRobots,
            id: idRobots,
            data: { ...row, user_robots: [] }
        });
    }
    const userRobotsExist = Object.keys(context.cache.data.data.ROOT_QUERY).find(
        (el) => el.indexOf("user_robots_robots") === 0
    );
    if (userRobotsExist) {
        const dataRobots = context.cache.readQuery({ query: USER_ROBOTS });
        context.cache.writeQuery({
            query: USER_ROBOTS,
            data: {
                robots: dataRobots.robots.filter((el) => el.id !== variables.robot.userRobotId)
            }
        });
    }
    const robotsExist = Object.keys(context.cache.data.data.ROOT_QUERY).find(
        (el) => el.indexOf("robots_info_user_robots") === 0
    );
    if (robotsExist) {
        const idUserRobots = context.getCacheKey({
            __typename: "robots",
            id: variables.robot.id
        });
        const fragmentDeleteUserRobots = gql`
            fragment deleteRobotsRow on robots {
                user_robots {
                    id
                    status
                    settings
                    started_at
                    statistics
                    message
                    equity
                }
            }
        `;
        const row = context.cache.readFragment({
            fragment: fragmentDeleteUserRobots,
            id: idUserRobots
        });
        context.cache.writeFragment({
            fragment: fragmentDeleteUserRobots,
            id: idUserRobots,
            data: { ...row, user_robots: [] }
        });
    }
};

export const actionRobot = (_root: any, variables: any, context: any) => {
    const robotsStatsExist = Object.keys(context.cache.data.data.ROOT_QUERY).find(
        (el) => el.indexOf("v_robots_stats_robots") === 0
    );
    if (robotsStatsExist) {
        const idRobots = context.getCacheKey({
            __typename: "robots",
            id: variables.robot.id
        });
        const fragmentStartStopRobots = gql`
            fragment changeActionRow on robots {
                user_robots {
                    id
                    status
                    settings
                    started_at
                    equity
                }
            }
        `;
        const row = context.cache.readFragment({
            fragment: fragmentStartStopRobots,
            id: idRobots
        });
        const row_user_robots = row.user_robots.map((rowItem) => ({
            ...rowItem,
            status: variables.message,
            started_at: variables.message === "started" ? dayjs(new Date()).toISOString() : null
        }));
        const data = { ...row, user_robots: row_user_robots };
        context.cache.writeFragment({
            fragment: fragmentStartStopRobots,
            id: idRobots,
            data
        });
    }
    const robotsExist = Object.keys(context.cache.data.data.ROOT_QUERY).find(
        (el) => el.indexOf("robots_info_user_robots") === 0
    );
    if (robotsExist) {
        const idRobots = context.getCacheKey({
            __typename: "robots",
            id: variables.robot.id
        });
        const fragmentStartStopUserRobots = gql`
            fragment changeActionUserRobots on robots {
                user_robots {
                    id
                    status
                    settings
                    started_at
                    statistics
                    message
                    equity
                }
            }
        `;
        const row = context.cache.readFragment({
            fragment: fragmentStartStopUserRobots,
            id: idRobots
        });
        const row_user_robots = row.user_robots.map((rowItem) => ({
            ...rowItem,
            status: variables.message,
            started_at: variables.message === "started" ? dayjs(new Date()).toISOString() : null
        }));
        const data = { ...row, user_robots: row_user_robots };
        context.cache.writeFragment({
            fragment: fragmentStartStopUserRobots,
            id: idRobots,
            data
        });
    }
    const userRobotsExist = Object.keys(context.cache.data.data.ROOT_QUERY).find(
        (el) => el.indexOf("user_robots_robots") === 0
    );
    if (userRobotsExist) {
        const idUserRobots = context.getCacheKey({
            __typename: "user_robots",
            id: variables.robot.userRobotId
        });
        if (idUserRobots !== "user_robots:null") {
            const fragmentStartStopUserRobots = gql`
                fragment changeActionUserRow on user_robots {
                    status
                    started_at
                }
            `;
            const row = context.cache.readFragment({
                fragment: fragmentStartStopUserRobots,
                id: idUserRobots
            });
            const data = {
                ...row,
                status: variables.message,
                started_at: variables.message === "started" ? dayjs(new Date()).toISOString() : null
            };
            context.cache.writeFragment({
                fragment: fragmentStartStopUserRobots,
                id: idUserRobots,
                data
            });
        }
    }
};

export const editRobot = (_root: any, variables: any, context: any) => {
    const userRobotsExist = Object.keys(context.cache.data.data.ROOT_QUERY).find(
        (el) => el.indexOf("user_robots_robots") === 0
    );
    if (userRobotsExist) {
        const dataRobots = context.cache.readQuery({ query: USER_ROBOTS });
        const robots = dataRobots.robots.map((el) => {
            if (el.id === variables.robot.userRobotId) {
                return {
                    ...el,
                    settings: { ...el.settings, volume: variables.volume }
                };
            }
            return el;
        });
        context.cache.writeQuery({
            query: USER_ROBOTS,
            data: { robots }
        });
    }
    const robotsStatsExist = Object.keys(context.cache.data.data.ROOT_QUERY).find(
        (el) => el.indexOf("v_robots_stats_robots") === 0
    );
    if (robotsStatsExist) {
        const dataRobots = context.cache.readQuery({
            query: USER_ROBOTS_BY_STATS
        });
        const v_robots_stats = dataRobots.v_robots_stats.map((el) => {
            if (el.robots.id === variables.robot.id) {
                const item = {
                    ...el.robots.user_robots[0],
                    settings: {
                        ...el.robots.user_robots[0].settings,
                        volume: variables.volume
                    }
                };
                const robots = { ...el.robots, user_robots: [item] };
                return { ...el, robots };
            }
            return el;
        });
        context.cache.writeQuery({
            query: USER_ROBOTS_BY_STATS,
            data: { v_robots_stats }
        });
    }
    const robotsExist = Object.keys(context.cache.data.data.ROOT_QUERY).find(
        (el) => el.indexOf("robots_info_user_robots") === 0
    );
    if (robotsExist) {
        const dataRobots = context.cache.readQuery({
            query: ROBOT_INFO_FOR_USER_ROBOT,
            variables: { code: variables.code }
        });
        const robot = dataRobots.robot.map((el) => {
            if (el.id === variables.robot.id) {
                const user_robots = el.user_robots.map((elUserRobots) => ({
                    ...elUserRobots,
                    settings: { ...elUserRobots.settings, volume: variables.volume }
                }));
                return { ...el, user_robots };
            }
            return el;
        });
        context.cache.writeQuery({
            query: ROBOT_INFO_FOR_USER_ROBOT,
            variables: { code: variables.code },
            data: { robot }
        });
    }
};

export const createRobot = (_root: any, variables: any, context: any) => {
    const robotsStatsExist = Object.keys(context.cache.data.data.ROOT_QUERY).find(
        (el) => el.indexOf("v_robots_stats_robots") === 0
    );
    let robotInfo;
    if (robotsStatsExist) {
        const dataRobots = context.cache.readQuery({
            query: USER_ROBOTS_BY_STATS
        });
        const v_robots_stats = dataRobots.v_robots_stats.map((el) => {
            if (el.robots.id === variables.robotInfo.robotId) {
                const item = {
                    status: "stopped",
                    id: variables.robotInfo.userRobotId,
                    started_at: null,
                    equity: null,
                    settings: { volume: variables.volume },
                    __typename: "user_robots"
                };
                const robots = { ...el.robots, user_robots: [item] };
                robotInfo = { ...el.robots };
                return { ...el, robots };
            }
            return el;
        });
        context.cache.writeQuery({
            query: USER_ROBOTS_BY_STATS,
            data: { v_robots_stats }
        });
    }
    const userRobotsExist = Object.keys(context.cache.data.data.ROOT_QUERY).find(
        (el) => el.indexOf("user_robots_robots") === 0
    );
    if (userRobotsExist) {
        const dataUserRobots = context.cache.readQuery({ query: USER_ROBOTS });
        const item = {
            id: variables.robotInfo.userRobotId,
            status: "stopped",
            settings: { volume: variables.volume },
            robot_id: variables.robotInfo.robotId,
            started_at: null,
            equity: null,
            __typename: "user_robots",
            robot: {
                name: robotInfo.name,
                asset: robotInfo.asset,
                currency: robotInfo.currency,
                exchange: robotInfo.exchange,
                code: robotInfo.code,
                active: robotInfo.active,
                __typename: "robots"
            }
        };
        context.cache.writeQuery({
            query: USER_ROBOTS,
            data: { robots: [...dataUserRobots.robots, item] }
        });
    }
    const robotsExist = Object.keys(context.cache.data.data.ROOT_QUERY).find(
        (el) => el.indexOf("robots_info_user_robots") === 0
    );
    if (robotsExist) {
        const dataRobots = context.cache.readQuery({
            query: ROBOT_INFO_FOR_USER_ROBOT,
            variables: { code: variables.robotInfo.code }
        });
        const item = {
            id: variables.robotInfo.userRobotId,
            status: "stopped",
            settings: { volume: variables.volume },
            started_at: null,
            statistics: [],
            message: null,
            equity: null,
            __typename: "user_robots"
        };
        const robot = dataRobots.robot.map((el) => {
            if (el.id === variables.robotInfo.robotId) {
                return { ...el, user_robots: [item] };
            }
            return el;
        });
        context.cache.writeQuery({
            query: ROBOT_INFO_FOR_USER_ROBOT,
            variables: { code: variables.robotInfo.code },
            data: { robot }
        });
    }
};
