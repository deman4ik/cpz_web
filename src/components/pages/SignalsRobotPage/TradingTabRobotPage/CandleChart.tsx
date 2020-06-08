/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, memo, useContext } from "react";
import { useQuery, useMutation, useSubscription } from "@apollo/react-hooks";
import dynamic from "next/dynamic";

// components
import { ChartType } from "components/charts/LightWeightChart/types";
import { LoadingIndicator } from "components/common";
// graphql
import { ROBOT_POSITION_WITH_CANDLE, ROBOT_POSITION_WITH_CANDLE_NOT_AUTH } from "graphql/robots/queries";
import { ROBOT_POSITION_WITH_CANDLE_SUB, ROBOT_POSITION_WITH_CANDLE_SUB_NOT_AUTH } from "graphql/robots/subscribtions";
import { SET_CHART_DATA } from "graphql/local/mutations";
// helpers
import { getFormatData, getFormatUpdateData } from "../helpers";
import { getLegend } from "config/utils";
// context
import { AuthContext } from "libs/hoc/authContext";

interface Props {
    robot: any;
    signals: any;
    width: number;
    setIsChartLoaded: (isChartLoaded: boolean) => void;
}
const LIMIT = 120;
const LightWeightChartWithNoSSR = dynamic(() => import("components//charts/LightWeightChart"), {
    loading: () => <LoadingIndicator style={{ height: 400 }} />,
    ssr: false
});

const _CandleChart: React.FC<Props> = ({ robot, signals, width, setIsChartLoaded }) => {
    /*Определение контекста для отображения данных графика*/
    const {
        authState: { isAuth }
    } = useContext(AuthContext);

    const candleQueries = isAuth
        ? { candle: ROBOT_POSITION_WITH_CANDLE, candleSub: ROBOT_POSITION_WITH_CANDLE_SUB }
        : { candle: ROBOT_POSITION_WITH_CANDLE_NOT_AUTH, candleSub: ROBOT_POSITION_WITH_CANDLE_SUB_NOT_AUTH };

    const candleName = `candles${robot.timeframe}`;
    const legend = getLegend(robot);
    const { asset } = robot;
    const [limit, setLimit] = useState(LIMIT);
    const [formatData, setFormatData] = useState({ candles: [], markers: [] });

    const { loading, data, fetchMore } = useQuery(candleQueries.candle(robot.timeframe), {
        variables: {
            robotId: robot.id,
            limit
        },
        notifyOnNetworkStatusChange: true
    });

    const { data: dataUpdate } = useSubscription(candleQueries.candleSub(robot.timeframe), {
        variables: {
            robotId: robot.id
        }
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

    useEffect(() => {
        if (!loading && data) {
            setFormatData(getFormatData(data, asset));
        }
    }, [loading, data, asset]);

    useEffect(() => {
        if (data && dataUpdate && dataUpdate.candles.length) {
            const updateCandle = getFormatUpdateData(dataUpdate, asset);
            if (updateCandle.candles.time && !formatData.candles.find((el) => el.time === updateCandle.candles.time)) {
                setFormatData((prev) => ({
                    candles: [...prev.candles, updateCandle.candles],
                    markers: [...prev.markers, ...updateCandle.markers]
                }));
                setLimit(limit + 1);
            }
        }
    }, [dataUpdate, asset]);

    useEffect(() => {
        setChartData({ variables: { limit, robotId: robot.id, timeframe: robot.timeframe } });
    }, [limit]);

    return (
        <LightWeightChartWithNoSSR
            loading={loading}
            data={formatData.candles}
            onFetchMore={onFetchMore}
            markers={formatData.markers}
            lines={signals}
            size={{ width, height: 400 }}
            legend={legend}
            setIsChartLoaded={setIsChartLoaded}
            type={ChartType.candle}
        />
    );
};

export const CandleChart = memo(_CandleChart);
