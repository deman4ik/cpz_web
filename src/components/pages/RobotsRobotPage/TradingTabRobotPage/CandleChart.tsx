/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext, useRef } from "react";
import { useQuery, useMutation, useSubscription } from "@apollo/client";
import dynamic from "next/dynamic";
import { ChartType } from "components/charts/LightWeightChart/types";
import { LoadingIndicator } from "components/common";
import { buildRobotPositionCandlesQuery } from "graphql/robots/queries";
import { buildRobotPositionCandleSubQuery } from "graphql/robots/subscriptions";
import { SET_CHART_DATA } from "graphql/local/mutations";
import { getFormatData } from "../helpers";
import { getLegend } from "config/utils";
import { AuthContext } from "libs/hoc/authContext";
import { getFormatUpdateData } from "components/pages/SignalsRobotPage/helpers";

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

// TODO: определить, userRobots должен быть массивом или одним объектом
export const CandleChart: React.FC<Props> = ({ robot, width, userRobots: userRobot, setIsChartLoaded }) => {
    const {
        authState: { isAuth, user_id }
    } = useContext(AuthContext);

    const { asset, timeframe, id: robotId } = robot;

    const candleQueries = {
        history: buildRobotPositionCandlesQuery(timeframe, isAuth, !!userRobot),
        realTimeSub: buildRobotPositionCandleSubQuery(isAuth, timeframe)
    };

    const legend = getLegend(robot);
    const [limit, setLimit] = useState(LIMIT);
    const [formatData, setFormatData] = useState({ candles: [], markers: [] });

    // history candles load
    const historyQueryVars = isAuth
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
    useEffect(() => {
        if (!loading && data) {
            setFormatData(getFormatData(data, asset, !!userRobot));
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

        const { updateCandle, markers } = getFormatUpdateData(dataUpdate, asset);
        const { candles: oldCandles } = formatData;
        if (!updateCandle.time) {
            return;
        }

        const existingCandleIndex = oldCandles.findIndex((el) => el.time === updateCandle.time);
        if (existingCandleIndex === -1) {
            setFormatData((prev) => ({
                candles: [...prev.candles, updateCandle],
                markers: [...prev.markers, ...markers]
            }));
            setLimit((oldLimit) => oldLimit + 1);
        } else {
            setFormatData((prev) => {
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
