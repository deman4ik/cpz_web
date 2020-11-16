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
import { candleQueries } from "components/pages/helpers";
import { CandleChartComponent } from "components/common/CandleChartComponent";

interface Props {
    robot: any;
    userRobot: any;
    width: number;
    setIsChartLoaded?: (isChartLoaded: boolean) => void;
}

export const CandleChart: React.FC<Props> = ({ robot, width, userRobot, setIsChartLoaded }) => {
    const {
        authState: { isAuth, user_id }
    } = useContext(AuthContext);

    const userRobotId = userRobot?.id;
    const authAndOwnedByUser = isAuth && userRobotId;

    const { timeframe, id: robotId } = robot;

    const robotCandleQuery = candleQueries(timeframe, isAuth, authAndOwnedByUser).robot;

    const variables = authAndOwnedByUser ? { robotId: userRobotId || robotId, user_id } : { robotId };

    return (
        <CandleChartComponent
            robot={robot}
            variables={variables}
            realTimeSubQuery={robotCandleQuery.realTimeSub}
            historyQuery={robotCandleQuery.history}
            width={width}
            setIsChartLoaded={setIsChartLoaded}
        />
    );
};
