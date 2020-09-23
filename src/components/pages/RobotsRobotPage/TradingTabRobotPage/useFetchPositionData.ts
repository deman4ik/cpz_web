import { useContext, useMemo, useState } from "react";
import { useQuery } from "@apollo/client";

import { DISPLAY_CLOSED_POSITIONS, POLL_INTERVAL } from "config/constants";
import { ROBOT_POSITIONS, ROBOT_POSITIONS_FOR_USER, USER_ROBOT_POSITIONS_AGGREGATE } from "graphql/robots/queries";
import { SIGNAL_ROBOT_POSITIONS_AGGREGATE } from "graphql/signals/queries";
// context
import { AuthContext } from "libs/hoc/context";

export const useFetchPositionData = (isUserRobot, userRobots, robot) => {
    const arrStatus = isUserRobot ? ["closed", "closedAuto"] : ["closed"];
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [limit, setLimit] = useState(DISPLAY_CLOSED_POSITIONS);
    const {
        authState: { user_id }
    } = useContext(AuthContext);
    const mainVariables = {
        robotId: isUserRobot ? userRobots.id : robot.id,
        status: { _in: arrStatus },
        limit,
        offset: 0,
        orderBy: { entry_date: "desc" }
    };

    const { data, loading, fetchMore } = useQuery(isUserRobot ? ROBOT_POSITIONS_FOR_USER : ROBOT_POSITIONS, {
        variables: isUserRobot ? { ...mainVariables, user_id } : { ...mainVariables },
        pollInterval: POLL_INTERVAL
    });

    const { data: dataCount, loading: loadingAggregate } = useQuery(
        userRobots ? USER_ROBOT_POSITIONS_AGGREGATE : SIGNAL_ROBOT_POSITIONS_AGGREGATE,
        {
            variables: {
                robotId: isUserRobot ? userRobots.id : robot.id,
                status: { _in: arrStatus }
            },
            pollInterval: POLL_INTERVAL
        }
    );

    const dataOpenPosVars = {
        robotId: isUserRobot ? userRobots.id : robot.id,
        status: { _eq: "open" },
        orderBy: { entry_date: "desc" }
    };
    const { data: dataOpenPos, loading: loadingOpenPos } = useQuery(
        userRobots ? ROBOT_POSITIONS_FOR_USER : ROBOT_POSITIONS,
        {
            variables: userRobots ? { ...dataOpenPosVars, user_id } : { ...dataOpenPosVars },
            pollInterval: POLL_INTERVAL
        }
    );

    const quantyRecords = useMemo(
        () => (!loadingAggregate && dataCount ? dataCount.positions_aggregate.aggregate.count : 0),
        [dataCount, loadingAggregate]
    );

    const handleLoadMore = () => {
        setIsLoadingMore(true);

        fetchMore({
            variables: {
                offset: data.positions.length,
                limit: DISPLAY_CLOSED_POSITIONS
            },
            updateQuery: (prev: any, { fetchMoreResult }) => {
                setIsLoadingMore(false);
                if (!fetchMoreResult) return prev;
                setLimit(data.positions.length + DISPLAY_CLOSED_POSITIONS);
                return {
                    positions: [...prev.positions, ...fetchMoreResult.positions]
                };
            }
        });
    };

    return {
        isLoadingMore,
        quantyRecords,
        dataOpenPos,
        handleLoadMore,
        data,
        loading: loading || loadingAggregate || loadingOpenPos
    };
};
