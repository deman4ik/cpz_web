import { useContext, useMemo, useState } from "react";
import { useQuery } from "@apollo/client";

import { CLOSED_POSITIONS_LIMIT, POLL_INTERVAL } from "config/constants";
import { ROBOT_POSITIONS, ROBOT_POSITIONS_FOR_USER, USER_ROBOT_POSITIONS_AGGREGATE } from "graphql/robots/queries";
import { SIGNAL_ROBOT_POSITIONS_AGGREGATE } from "graphql/signals/queries";
// context
import { AuthContext } from "libs/hoc/context";

interface RobotData {
    userRobot: any;
    robot: any;
}

export const useFetchPositionData = (robotData: RobotData): any => {
    const {
        authState: { user_id }
    } = useContext(AuthContext);

    const { userRobot, robot } = robotData;

    const statusOptions = userRobot ? ["closed", "closedAuto"] : ["closed"];

    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [limit, setLimit] = useState(CLOSED_POSITIONS_LIMIT);

    const queryVars = {
        robotId: userRobot ? userRobot.id : robot.id,
        status: { _in: statusOptions },
        limit,
        offset: 0,
        orderBy: { entry_date: "desc" }
    };

    const { data: closedPositionsData, loading, fetchMore } = useQuery(
        userRobot ? ROBOT_POSITIONS_FOR_USER : ROBOT_POSITIONS,
        {
            variables: userRobot ? { ...queryVars, user_id } : queryVars,
            pollInterval: POLL_INTERVAL
        }
    );

    const { data: aggrData, loading: loadingAggregate } = useQuery(
        userRobot ? USER_ROBOT_POSITIONS_AGGREGATE : SIGNAL_ROBOT_POSITIONS_AGGREGATE,
        {
            variables: {
                robotId: userRobot ? userRobot.id : robot.id,
                status: { _in: statusOptions }
            },
            pollInterval: POLL_INTERVAL
        }
    );

    const openPositionsQueryVars = {
        robotId: userRobot ? userRobot.id : robot.id,
        status: { _eq: "open" },
        orderBy: { entry_date: "desc" }
    };

    const { data: openPositionsData, loading: loadingOpenPos } = useQuery(
        userRobot ? ROBOT_POSITIONS_FOR_USER : ROBOT_POSITIONS,
        {
            variables: userRobot ? { ...openPositionsQueryVars, user_id } : openPositionsQueryVars,
            pollInterval: POLL_INTERVAL
        }
    );

    const recordsCount = useMemo(
        () => (!loadingAggregate && aggrData ? aggrData.positions_aggregate.aggregate.count : 0),
        [aggrData, loadingAggregate]
    );

    const handleLoadMore = () => {
        setIsLoadingMore(true);

        fetchMore({
            variables: {
                offset: closedPositionsData.positions.length,
                limit: CLOSED_POSITIONS_LIMIT
            }
        });
        setLimit(closedPositionsData.positions.length + CLOSED_POSITIONS_LIMIT);
    };

    return {
        isLoadingMore,
        recordsCount,
        openPositions: openPositionsData?.positions,
        closedPositions: closedPositionsData?.positions,
        handleLoadMore,
        loading: loading || loadingAggregate || loadingOpenPos
    };
};
