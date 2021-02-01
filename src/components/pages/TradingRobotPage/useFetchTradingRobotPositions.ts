import { useContext, useEffect, useMemo, useState } from "react";
import { useQuery } from "@apollo/client";

import { CLOSED_POSITIONS_LIMIT, POLL_INTERVAL } from "config/constants";
import { ROBOT_POSITIONS, ROBOT_POSITIONS_FOR_USER, USER_ROBOT_POSITIONS_AGGREGATE } from "graphql/robots/queries";
import { SIGNAL_ROBOT_POSITIONS_AGGREGATE } from "graphql/signals/queries";
// context
import { AuthContext } from "providers/authContext";
import { useScrollPosition } from "hooks/useScrollPosition";

interface RobotData {
    userRobot: any;
    robot: any;
}

const useFetchTradingRobotPosition = (robotData: RobotData, preserveScrollPosition?: boolean): any => {
    const {
        authState: { user_id }
    } = useContext(AuthContext);

    const { userRobot, robot } = robotData;

    const { preservePosition, restorePosition } = useScrollPosition();

    const [loadingMore, setLoadingMore] = useState(false);
    const statusOptions = userRobot ? ["closed", "closedAuto"] : ["closed"];

    const [limit, setLimit] = useState(CLOSED_POSITIONS_LIMIT);

    const queryVars = {
        robotId: userRobot ? userRobot.id : robot.id,
        status: { _in: statusOptions },
        limit,
        offset: 0,
        orderBy: { entry_date: "desc" }
    };

    const [closedPositions, setClosedPositions] = useState([]);
    useEffect(() => {
        if (preserveScrollPosition) restorePosition();
    }, [preserveScrollPosition, restorePosition, closedPositions]);

    const { data: closedPositionsData, fetchMore } = useQuery(userRobot ? ROBOT_POSITIONS_FOR_USER : ROBOT_POSITIONS, {
        variables: userRobot ? { ...queryVars, user_id } : queryVars,
        pollInterval: POLL_INTERVAL,
        onCompleted: () => {
            if (preserveScrollPosition) preservePosition();
            setClosedPositions(closedPositionsData?.positions);
        }
    });

    const idUserAndSignal = userRobot
        ? { robotId: userRobot.id, status: { _in: statusOptions } }
        : { robot_id: robot.id, status: { _in: statusOptions } };

    const { data: aggrData, loading: loadingAggregate } = useQuery(
        userRobot ? USER_ROBOT_POSITIONS_AGGREGATE : SIGNAL_ROBOT_POSITIONS_AGGREGATE,
        {
            variables: idUserAndSignal,
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
        setLoadingMore(true);
        fetchMore({
            variables: {
                offset: limit,
                limit: CLOSED_POSITIONS_LIMIT
            }
        })
            .catch((e) => console.error(e))
            .finally(() => {
                setLimit(limit + CLOSED_POSITIONS_LIMIT);
                setLoadingMore(false);
            });
    };

    return {
        isLoadingMore: loadingMore,
        recordsCount,
        openPositions: openPositionsData?.positions || [],
        closedPositions,
        handleLoadMore,
        loading: loadingAggregate || loadingOpenPos
    };
};

export default useFetchTradingRobotPosition;
