/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, memo, useContext, useRef, useCallback } from "react";
import dynamic from "next/dynamic";

import { LoadingIndicator } from "components/common";

import { useQuery, useMutation, useSubscription } from "@apollo/client";
import { buildRobotPositionCandlesQuery } from "graphql/robots/queries";
import { buildSignalPositionCandleSubQuery } from "graphql/signals/subscriptions";
import { SET_CHART_DATA } from "graphql/local/mutations";

import { getCandleChartData, getUpdatedCandleChartData } from "../../helpers";
import { ChartType } from "components/charts/LightWeightChart/types";
import { getLegend } from "config/utils";
import { AuthContext } from "libs/hoc/context";
import { candleQueries } from "components/pages/helpers";
import { CandleChartComponent } from "components/common/CandleChartComponent";

interface Props {
    robot: any;
    signals: any;
    width: number;
    setIsChartLoaded: (isChartLoaded: boolean) => void;
}

const _CandleChart: React.FC<Props> = ({ robot, signals, width, setIsChartLoaded }) => {
    const {
        authState: { isAuth }
    } = useContext(AuthContext);
    const { timeframe, id: robotId, user_signal_id: userSignalId } = robot;

    const authAndOwnedByUser = isAuth && userSignalId;
    const signalCandleQueries = candleQueries(timeframe, isAuth, authAndOwnedByUser).signal;

    const variables = authAndOwnedByUser ? { userSignalId } : { robotId };

    return (
        <CandleChartComponent
            robot={robot}
            signals={signals}
            variables={variables}
            realTimeSubQuery={signalCandleQueries.realTimeSub}
            historyQuery={signalCandleQueries.history}
            width={width}
            setIsChartLoaded={setIsChartLoaded}
        />
    );
};

export const CandleChart = memo(_CandleChart);
