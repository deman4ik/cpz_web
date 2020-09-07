/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState, useEffect, useContext, useRef, useCallback } from "react";
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

    const limitRef = useRef(limit);
    useEffect(() => {
        limitRef.current = limit;
    }, [limit]);
    // todo: split to two different queries: one for history load, another for real time data polling
    const onFetchMore = (offset: number) => {
        const variables = {
            offset: limitRef.current,
            limit: limitRef.current + LIMIT
        };
        fetchMore({
            variables,
            updateQuery: (prev: any, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                setLimit((oldLimit) => oldLimit + LIMIT);
                let result = null;
                try {
                    const prevCandlesByTime = prev.candles.reduce((acc, curr) => {
                        acc[curr.time] = curr;
                        return acc;
                    }, {});
                    const uniqueCandles = [...prev.candles];
                    for (let i = 0; i < fetchMoreResult.candles.length; i++) {
                        const fetchedCandle = fetchMoreResult.candles[i];
                        if (!Object.prototype.hasOwnProperty.call(prevCandlesByTime, fetchedCandle.time)) {
                            uniqueCandles.push(fetchedCandle);
                        }
                    }

                    result = {
                        ...prev,
                        candles: uniqueCandles
                    };
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

    const [setChartData] = useMutation(SET_CHART_DATA);
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
