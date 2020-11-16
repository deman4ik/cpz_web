import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { ChartType } from "components/charts/LightWeightChart/types";
import dynamic from "next/dynamic";
import { LoadingIndicator } from "components/common/LoadingIndicator";
import { getLegend } from "config/utils";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { getCandleChartData, getUpdatedCandleChartData } from "components/pages/SignalRobotPage/helpers";
import { QueryType } from "components/pages/ManagePage/common/types";
import { SET_CHART_DATA } from "graphql/local/mutations";

const LightWeightChartWithNoSSR = dynamic(() => import("components/charts/LightWeightChart"), {
    loading: () => <LoadingIndicator style={{ height: 400 }} />,
    ssr: false
});

interface CandleChartComponentProps {
    robot: any;
    signals?: any;
    variables: { userSignalId?: string; robotId?: string };
    realTimeSubQuery: QueryType;
    historyQuery: QueryType;
    width: number;
    fullWidth?: boolean;
    setIsChartLoaded?: (isChartLoaded: boolean) => void;
}
const LIMIT = 120;
const initialCandleChartData = { candles: [], markers: [] };

export const CandleChartComponent: FC<CandleChartComponentProps> = ({
    fullWidth,
    robot,
    signals,
    width,
    setIsChartLoaded,
    variables,
    historyQuery,
    realTimeSubQuery
}) => {
    const legend = getLegend(robot);
    const [limit, setLimit] = useState(LIMIT);
    const [chartData, setChartData] = useState(initialCandleChartData);
    const { asset, timeframe, id: robotId } = robot;
    const queryVariables = { ...variables, limit };
    const { loading, data, fetchMore } = useQuery(historyQuery, {
        variables: queryVariables,
        notifyOnNetworkStatusChange: true
    });

    const limitRef = useRef(limit);
    useEffect(() => {
        limitRef.current = limit;
    }, [limit]);

    const onFetchMore = useCallback(
        () => (offset: number, signal?: AbortSignal) => {
            const vars = {
                offset: limitRef.current,
                limit: limitRef.current + LIMIT
            };
            fetchMore({
                variables: vars,
                context: { fetchOptions: { signal } }
            }).catch((e) => console.error(e));
            setLimit((oldLimit) => oldLimit + LIMIT);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    useEffect(() => {
        if (!loading && data) {
            setChartData(getCandleChartData(data, asset));
        }
    }, [loading, data, asset]);

    const { data: dataUpdate } = useSubscription(realTimeSubQuery, {
        variables: queryVariables
    });

    useEffect(() => {
        if (!data || !dataUpdate || !dataUpdate.candles.length) {
            return;
        }

        const { updateCandle, markers } = getUpdatedCandleChartData(dataUpdate, asset);
        if (!updateCandle.time) {
            return;
        }

        setChartData((prev) => {
            const candleId = prev.candles.findIndex((el) => el.time === updateCandle.time);
            const newState = { markers: [...prev.markers, ...markers], candles: prev.candles };
            if (candleId === -1) {
                newState.candles = [...prev.candles, updateCandle];
            }
            return newState;
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataUpdate, asset]);

    const [mutateChartData] = useMutation(SET_CHART_DATA);
    useEffect(() => {
        mutateChartData({ variables: { limit, robotId, timeframe } }).catch((e) => console.error(e));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [limit]);

    return (
        <LightWeightChartWithNoSSR
            fullWidth={fullWidth}
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
