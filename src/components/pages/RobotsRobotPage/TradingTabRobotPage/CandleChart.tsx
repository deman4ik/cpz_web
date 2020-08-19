/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState, useEffect, useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import dynamic from "next/dynamic";

// components
import { ChartType } from "components/charts/LightWeightChart/types";
import { LoadingIndicator } from "components/common";
// graphql
import {
    ROBOT_POSITION_WITH_CANDLE,
    USER_ROBOTS_POSITION_WITH_CANDLE,
    ROBOT_POSITION_WITH_CANDLE_NOT_AUTH
} from "graphql/robots/queries";
import { SET_CHART_DATA } from "graphql/local/mutations";
// constants
import { POLL_INTERVAL } from "config/constants";
import { getFormatData } from "../helpers";
import { getLegend } from "config/utils";
// context
import { AuthContext } from "libs/hoc/authContext";

interface Props {
    robot: any;
    userRobots: any;
    width: number;
    setIsChartLoaded: (isChartLoaded: boolean) => void;
}
const LIMIT = 120;

const LightWeightChartWithNoSSR = dynamic(() => import("components/charts/LightWeightChart"), {
    loading: () => <LoadingIndicator style={{ height: 400 }} />,
    ssr: false
});

export const CandleChart: React.FC<Props> = ({ robot, width, userRobots, setIsChartLoaded }) => {
    /*Определение контекста для отображения данных графика*/
    const {
        authState: { isAuth, user_id }
    } = useContext(AuthContext);

    let candleQuery = ROBOT_POSITION_WITH_CANDLE_NOT_AUTH;
    if (isAuth) {
        candleQuery = userRobots ? USER_ROBOTS_POSITION_WITH_CANDLE : ROBOT_POSITION_WITH_CANDLE;
    }

    const candleName = `candles${robot.timeframe}`;
    const legend = getLegend(robot);
    const { asset } = robot;
    const [limit, setLimit] = useState(LIMIT);

    const vars = isAuth
        ? { robotId: userRobots ? userRobots.id : robot.id, limit, user_id }
        : { robotId: userRobots ? userRobots.id : robot.id, limit };
    const { loading, data, fetchMore } = useQuery(candleQuery(robot.timeframe), {
        variables: vars,
        pollInterval: POLL_INTERVAL,
        notifyOnNetworkStatusChange: true
    });

    const [setChartData] = useMutation(SET_CHART_DATA);
    const onFetchMore = () => {
        fetchMore({
            variables: {
                limit: limit + LIMIT
            },
            updateQuery: (prev: any, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                setLimit(limit + LIMIT);
                let result = null;
                try {
                    result = { ...{ [candleName]: [...fetchMoreResult[candleName]] } };
                } catch (err) {
                    result = prev;
                }
                return result;
            }
        });
    };

    const formatData = useMemo(
        () => (!loading && data ? getFormatData(data, asset, !!userRobots) : { candles: [], markers: [] }),
        [loading, data]
    );

    useEffect(() => {
        setChartData({ variables: { limit, robotId: robot.id, timeframe: robot.timeframe } });
    }, [limit]);

    return (
        <LightWeightChartWithNoSSR
            loading={loading}
            data={formatData.candles}
            onFetchMore={onFetchMore}
            markers={formatData.markers}
            legend={legend}
            setIsChartLoaded={setIsChartLoaded}
            size={{ width, height: 400 }}
            type={ChartType.candle}
        />
    );
};
