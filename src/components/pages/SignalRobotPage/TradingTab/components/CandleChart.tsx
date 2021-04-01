/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useContext } from "react";
import { AuthContext } from "providers/authContext";
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
    const { id: robotId, user_signal_id: userSignalId } = robot;

    const authAndOwnedByUser = isAuth && userSignalId;
    const signalCandleQueries = candleQueries(isAuth, authAndOwnedByUser).signal;

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
