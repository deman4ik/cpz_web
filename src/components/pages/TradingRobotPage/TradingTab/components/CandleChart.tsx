/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext, useRef, useCallback } from "react";
import { useQuery, useMutation, useSubscription } from "@apollo/client";
import dynamic from "next/dynamic";
import { ChartType } from "components/charts/LightWeightChart/types";
import { LoadingIndicator } from "components/common";
import { buildRobotPositionCandlesQuery } from "graphql/robots/queries";
import { buildRobotPositionCandleSubQuery } from "graphql/robots/subscriptions";
import { SET_CHART_DATA } from "graphql/local/mutations";
import { getCandleChartData } from "../../helpers";
import { getLegend } from "config/utils";
import { AuthContext } from "libs/hoc/context";
import { getUpdatedCandleChartData } from "components/pages/SignalRobotPage/helpers";

interface Props {
    robot: any;
    userRobot: any;
    width: number;
    setIsChartLoaded: (isChartLoaded: boolean) => void;
}
const LIMIT = 120;
const initialCandleChartData = { candles: [], markers: [] };

const LightWeightChartWithNoSSR = dynamic(() => import("components/charts/LightWeightChart"), {
    loading: () => <LoadingIndicator style={{ height: 400 }} />,
    ssr: false
});

export const CandleChart: React.FC<Props> = ({ robot, width, userRobot, setIsChartLoaded }) => {
    const {
        authState: { isAuth, user_id }
    } = useContext(AuthContext);

    const { asset, timeframe, id: robotId } = robot;

    const candleQueries = {
        history: buildRobotPositionCandlesQuery(timeframe, isAuth && userRobot, !!userRobot),
        realTimeSub: buildRobotPositionCandleSubQuery(isAuth, timeframe)
    };

    const legend = getLegend(robot);
    const [limit, setLimit] = useState(LIMIT);
    const [candleChartData, setCandleChartData] = useState(initialCandleChartData);

    // history candles load
    const historyQueryVars =
        isAuth && userRobot
            ? { robotId: userRobot ? userRobot.id : robotId, limit, user_id }
            : { robotId: userRobot ? userRobot.id : robotId, limit };
    const { loading, data, fetchMore } = useQuery(candleQueries.history, {
        variables: historyQueryVars,
        notifyOnNetworkStatusChange: true
    });

    const limitRef = useRef(limit);
    useEffect(() => {
        limitRef.current = limit;
    }, [limit]);
    const onFetchMore = useCallback(
        () => (offset: number, signal?: AbortSignal) => {
            const variables = {
                offset: limitRef.current,
                limit: limitRef.current + LIMIT
            };
            fetchMore({
                variables,
                context: { fetchOptions: { signal } }
            }).catch((e) => console.error(e));
        },
        []
    );
    useEffect(() => {
        if (!loading && data) {
            setCandleChartData(getCandleChartData(data, asset, !!userRobot));
        }
    }, [loading, data, asset]);

    // realtime candles load
    const varsSubscription = isAuth ? { robotId, user_id } : { robotId };
    const { data: dataUpdate } = useSubscription(candleQueries.realTimeSub, {
        variables: varsSubscription
    });
    useEffect(() => {
        if (!data || !dataUpdate || !dataUpdate.candles.length) {
            return;
        }

        const { updateCandle, markers } = getUpdatedCandleChartData(dataUpdate, asset);
        const { candles: oldCandles } = candleChartData;
        if (!updateCandle.time) {
            return;
        }

        const existingCandleIndex = oldCandles.findIndex((el) => el.time === updateCandle.time);
        if (existingCandleIndex === -1) {
            setCandleChartData((prev) => ({
                candles: [...prev.candles, updateCandle],
                markers: [...prev.markers, ...markers]
            }));
            setLimit((oldLimit) => oldLimit + 1);
        } else {
            setCandleChartData((prev) => {
                const candleId = prev.candles.findIndex((el) => el.time === updateCandle.time);
                if (candleId === -1) {
                    return {
                        candles: prev.candles,
                        markers: [...prev.markers, ...markers]
                    };
                }

                const newCandles = [...prev.candles];
                newCandles[candleId] = updateCandle;
                return {
                    candles: newCandles,
                    markers: [...prev.markers, ...markers]
                };
            });
        }
    }, [dataUpdate, asset]);

    const [setChartData] = useMutation(SET_CHART_DATA);
    useEffect(() => {
        setChartData({ variables: { limit, robotId, timeframe } });
    }, [limit]);

    return (
        <LightWeightChartWithNoSSR
            loading={loading}
            data={candleChartData.candles}
            onFetchMore={onFetchMore}
            markers={candleChartData.markers}
            legend={legend}
            setIsChartLoaded={setIsChartLoaded}
            size={{ width, height: 400 }}
            type={ChartType.candle}
        />
    );
};
