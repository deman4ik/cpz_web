/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, memo, useContext, useRef } from "react";
import dynamic from "next/dynamic";

import { LoadingIndicator } from "components/common";

import { useQuery, useMutation, useSubscription } from "@apollo/client";
import { buildRobotPositionCandlesQuery } from "graphql/robots/queries";
import { buildRobotPositionCandleSubQuery } from "graphql/robots/subscriptions";
import { SET_CHART_DATA } from "graphql/local/mutations";

import { getCandleChartData, getUpdatedCandleChartData } from "../../helpers";
import { ChartType } from "components/charts/LightWeightChart/types";
import { getLegend } from "config/utils";
import { AuthContext } from "libs/hoc/context";

interface Props {
    robot: any;
    signals: any;
    width: number;
    setIsChartLoaded: (isChartLoaded: boolean) => void;
}
const LIMIT = 120;

const LightWeightChartWithNoSSR = dynamic(() => import("components/charts/LightWeightChart"), {
    loading: () => <LoadingIndicator style={{ height: 400 }} />,
    ssr: false
});

const _CandleChart: React.FC<Props> = ({ robot, signals, width, setIsChartLoaded }) => {
    const {
        authState: { isAuth, user_id }
    } = useContext(AuthContext);

    const { asset, timeframe, id: robotId } = robot;

    const candleQueries = {
        history: buildRobotPositionCandlesQuery(timeframe, isAuth),
        realTimeSub: buildRobotPositionCandleSubQuery(isAuth, timeframe)
    };

    const legend = getLegend(robot);
    const [limit, setLimit] = useState(LIMIT);
    const [chartData, setChartData] = useState({ candles: [], markers: [] });

    // history candles load
    const historyQueryVars = isAuth ? { robotId, limit, user_id } : { robotId, limit };
    const { loading, data, fetchMore } = useQuery(candleQueries.history, {
        variables: historyQueryVars,
        notifyOnNetworkStatusChange: true
    });

    const limitRef = useRef(limit);
    useEffect(() => {
        limitRef.current = limit;
    }, [limit]);
    const onFetchMore = (offset: number) => {
        const variables = {
            offset: limitRef.current,
            limit: limitRef.current + LIMIT
        };
        fetchMore({
            variables,
            updateQuery: (prev: any, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                let result = null;
                try {
                    const prevCandlesByTime = prev.candles.reduce((acc, curr) => {
                        acc[curr.candle.time] = curr;
                        return acc;
                    }, {});
                    const uniqueCandles = [...prev.candles];
                    for (let i = 0; i < fetchMoreResult.candles.length; i++) {
                        const fetchedCandle = fetchMoreResult.candles[i].candle;
                        if (!Object.prototype.hasOwnProperty.call(prevCandlesByTime, fetchedCandle.time)) {
                            uniqueCandles.push(fetchedCandle);
                        }
                    }

                    setLimit((oldLimit) => oldLimit + (uniqueCandles.length - prev.candles.length));

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

    console.log(data);
    useEffect(() => {
        if (!loading && data) {
            setChartData(getCandleChartData(data, asset));
        }
    }, [loading, data, asset]);

    // realtime candles load
    const varsSubscription = isAuth ? { robotId, user_id } : { robotId };
    const { data: dataUpdate } = useSubscription(candleQueries.realTimeSub, {
        variables: varsSubscription
    });
    console.log("update", dataUpdate);

    useEffect(() => {
        if (!data || !dataUpdate || !dataUpdate.candles.length) {
            return;
        }

        const { updateCandle, markers } = getUpdatedCandleChartData(dataUpdate, asset);
        const { candles: oldCandles } = chartData;
        if (!updateCandle.time) {
            return;
        }

        const existingCandleIndex = oldCandles.findIndex((el) => el.time === updateCandle.time);
        if (existingCandleIndex === -1) {
            setChartData((prev) => ({
                candles: [...prev.candles, updateCandle],
                markers: [...prev.markers, ...markers]
            }));
            setLimit((oldLimit) => oldLimit + 1);
        } else {
            setChartData((prev) => {
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

    const [mutateChartData] = useMutation(SET_CHART_DATA);
    useEffect(() => {
        mutateChartData({ variables: { limit, robotId, timeframe } });
    }, [limit]);

    return (
        <LightWeightChartWithNoSSR
            loading={loading}
            data={chartData.candles}
            onFetchMore={onFetchMore}
            markers={chartData.markers}
            lines={signals}
            legend={legend}
            setIsChartLoaded={setIsChartLoaded}
            size={{ width, height: 400 }}
            type={ChartType.candle}
        />
    );
};

export const CandleChart = memo(_CandleChart);
