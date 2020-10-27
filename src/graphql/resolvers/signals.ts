import gql from "graphql-tag";
import dayjs from "libs/dayjs";
import { USER_SIGNALS, SIGNALS_SEARCH } from "graphql/signals/queries";
import { CANDLES_FOR_USER_SIGNAL } from "graphql/robots/queries";

export const unsubscribe = (_root: any, variables: any, context: any) => {
    const signalsExist = Object.keys(context.cache.data.data.ROOT_QUERY).find(
        (el) => el.indexOf("user_signals_robots") === 0
    );
    if (signalsExist) {
        const dataSignals = context.cache.readQuery({ query: USER_SIGNALS });
        context.cache.writeQuery({
            query: USER_SIGNALS,
            data: {
                signals: dataSignals.signals.filter((el) => el.robot.id !== variables.cache.id)
            }
        });
    }
    if (variables.cache.tableName === "robots" || variables.cache.tableName === "charts") {
        const idRobots = context.getCacheKey({
            __typename: "robots",
            id: variables.cache.id
        });
        context.cache.writeQuery({
            query: gql`
                query writeCacheData @client {
                    id
                    data {
                        user_signals
                    }
                }
            `,
            data: { id: idRobots, data: { user_signals: [] } }
        });
        if (variables.cache.tableName === "charts") {
            const { limit, robotId, timeframe } = variables.chartData;
            const dataCandles = context.cache.readQuery({
                query: CANDLES_FOR_USER_SIGNAL(timeframe),
                variables: { limit, robotId }
            });
            const dataChart = dataCandles.candles.map((item) => ({
                ...item,
                robot: { ...item.robot, user_signals: [] }
            }));
            context.cache.writeQuery({
                query: CANDLES_FOR_USER_SIGNAL(timeframe),
                variables: { limit, robotId },
                data: {
                    candles: dataChart
                }
            });
        }
    }
};

export const subscribe = (_root: any, variables: any, context: any) => {
    if (variables.type === "edit") {
        if (variables.cache.tableName === "robots" || variables.cache.tableName === "charts") {
            const idRobots = context.getCacheKey({
                __typename: "robots",
                id: variables.cache.id
            });
            const fragmentRobots = gql`
                fragment changeRow on robots {
                    user_signals {
                        volume
                    }
                }
            `;
            const row = context.cache.readFragment({
                fragment: fragmentRobots,
                id: idRobots
            });
            const row_user_signals = row.user_signals.map((rowItem) => ({
                ...rowItem,
                settings: variables.settings
            }));
            const data = { ...row, user_signals: row_user_signals };
            context.cache.writeQuery({
                query: gql`
                    query {
                        userId @client
                    }
                `,
                data: { id: idRobots, data }
            });

            if (variables.cache.tableName === "charts") {
                const { limit, robotId, timeframe } = variables.chartData;
                const dataCandles = context.cache.readQuery({
                    query: CANDLES_FOR_USER_SIGNAL(timeframe),
                    variables: { limit, robotId }
                });
                const dataChart = dataCandles.candles.map((item) => {
                    const user_signals = item.robot.user_signals.map((robotItem) => ({
                        ...robotItem,
                        volume: variables.volume
                    }));
                    return { ...item, robot: { ...item.robot, user_signals } };
                });
                context.cache.writeQuery({
                    query: CANDLES_FOR_USER_SIGNAL(timeframe),
                    variables: { limit, robotId },
                    data: {
                        candles: dataChart
                    }
                });
            }
        }
    } else {
        const robotsExist = Object.keys(context.cache.data.data.ROOT_QUERY).find(
            (el) => el.indexOf("robots_info_user_signals") === 0
        );
        if (robotsExist) {
            const idRobots = context.getCacheKey({
                __typename: "robots",
                id: variables.cache.id
            });
            const fragmentRobots = gql`
                fragment subscribeRow on robots {
                    user_signals {
                        subscribed_at
                        settings
                        statistics
                        equity
                    }
                }
            `;
            const row = context.cache.readFragment({
                fragment: fragmentRobots,
                id: idRobots
            });
            const userItem = {
                settings: variables.settings,
                subscribed_at: dayjs(new Date()).toISOString(),
                equity: [],
                statistics: [],
                __typename: "user_signals"
            };
            context.cache.writeFragment({
                fragment: fragmentRobots,
                id: idRobots,
                data: { ...row, user_signals: [userItem] }
            });
        }
        const vRobotsStatsExist = Object.keys(context.cache.data.data.ROOT_QUERY).find(
            (el) => el.indexOf("v_robots_stats_signals") === 0
        );
        const userSignalsItem = {
            settings: variables.settings,
            subscribed_at: dayjs(new Date()).toISOString(),
            equity: [],
            __typename: "user_signals"
        };
        if (vRobotsStatsExist) {
            const dataRobots = context.cache.readQuery({
                query: SIGNALS_SEARCH
            });
            const v_robots_stats = dataRobots.v_robots_stats.map((el) => {
                if (el.robots.id === variables.cache.id) {
                    const robots = { ...el.robots, user_signals: [userSignalsItem] };
                    return { ...el, robots };
                }
                return el;
            });
            context.cache.writeQuery({
                query: SIGNALS_SEARCH,
                data: { v_robots_stats }
            });
        }
        if (variables.cache.tableName === "charts") {
            const { limit, robotId, timeframe } = variables.chartData;
            const dataCandles = context.cache.readQuery({
                query: CANDLES_FOR_USER_SIGNAL(timeframe),
                variables: { limit, robotId }
            });

            const dataChart = dataCandles.candles.map((item) => {
                const user_signals = [...item.robot.user_signals, userSignalsItem];
                return { ...item, robot: { ...item.robot, user_signals } };
            });
            context.cache.writeQuery({
                query: CANDLES_FOR_USER_SIGNAL(timeframe),
                variables: { limit, robotId },
                data: {
                    candles: dataChart
                }
            });
        }

        const signalsExist = Object.keys(context.cache.data.data.ROOT_QUERY).find(
            (el) => el.indexOf("user_signals_robots") === 0
        );
        if (signalsExist) {
            const dataSignals = context.cache.readQuery({ query: USER_SIGNALS });
            const idRobots = context.getCacheKey({
                __typename: "robots",
                id: variables.cache.id
            });
            const fragmentRobots = gql`
                fragment addRow on robots {
                    id
                    code
                    name
                    exchange
                    asset
                    currency
                    status
                    started_at
                    user_signals {
                        volume
                        subscribed_at
                        equity
                    }
                }
            `;
            const item = {
                robot: context.cache.readFragment({
                    fragment: fragmentRobots,
                    id: idRobots
                }),
                __typename: "user_signals"
            };
            context.cache.writeQuery({
                query: USER_SIGNALS,
                data: {
                    signals: [...dataSignals.signals, item]
                }
            });
        }
    }
};
