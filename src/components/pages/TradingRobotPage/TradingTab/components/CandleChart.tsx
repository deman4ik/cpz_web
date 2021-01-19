/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from "react";
import { AuthContext } from "providers/authContext";
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
