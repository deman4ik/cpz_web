import { useMemo, useState, useEffect, useContext } from "react";
import { useQuery } from "@apollo/client";
// graphql
import { SIGNAL_POSITIONS_FOR_USER, ROBOT_POSITIONS_IN_INTERVAL } from "graphql/robots/queries";
import { SIGNAL_ROBOT_POSITIONS_AGGREGATE } from "graphql/signals/queries";
// constants
import { CLOSED_POSITIONS_LIMIT, POLL_INTERVAL } from "config/constants";
// helpers
import { getAlerts } from "./helpers";
// context
import { AuthContext } from "libs/hoc/context";

const useFetchSignalRobotPositions = (robotData) => {
    const {
        authState: { isAuth, user_id }
    } = useContext(AuthContext);

    const { user_signals: userRobot, robot } = robotData;
    const { isUserSubscribed } = robot;
    const robotPositionsQuery = isAuth && isUserSubscribed ? SIGNAL_POSITIONS_FOR_USER : ROBOT_POSITIONS_IN_INTERVAL;

    const [limit, setLimit] = useState(CLOSED_POSITIONS_LIMIT);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const queryVars = isAuth && isUserSubscribed ? { user_id } : null;

    const { data: signalsData, loading: loadingOpenSignals, refetch: refetch_open_signals } = useQuery(
        robotPositionsQuery,
        {
            variables: {
                robotId: robot.id,
                dateFrom: isUserSubscribed ? userRobot.subscribed_at : null,
                status: { _in: ["new", "open"] },
                orderBy: { entry_date: "desc" },
                ...queryVars
            },
            pollInterval: POLL_INTERVAL
        }
    );

    const { data: openPositionsData, loading: loadingOpenPositions, refetch: refetch_open } = useQuery(
        robotPositionsQuery,
        {
            variables: {
                robotId: robot.id,
                dateFrom: isUserSubscribed ? userRobot.subscribed_at : null,
                status: { _eq: "open" },
                orderBy: { entry_date: "desc" },
                ...queryVars
            },
            pollInterval: POLL_INTERVAL
        }
    );

    const { data: closedPositionsData, loading: loadingClosedPositions, fetchMore, refetch: refetch_closed } = useQuery(
        robotPositionsQuery,
        {
            variables: {
                robotId: robot.id,
                dateFrom: isUserSubscribed ? userRobot.subscribed_at : null,
                status: { _eq: "closed" },
                limit,
                orderBy: { entry_date: "desc" },
                ...queryVars
            },
            pollInterval: POLL_INTERVAL
        }
    );

    const { data: aggrData, loading: loadingAggregate } = useQuery(SIGNAL_ROBOT_POSITIONS_AGGREGATE, {
        variables: {
            robotId: robot.id,
            dateFrom: isUserSubscribed ? userRobot.subscribed_at : null,
            status: { _eq: "closed" }
        },
        pollInterval: POLL_INTERVAL
    });

    const handleLoadMore = () => {
        setIsLoadingMore(true);
        fetchMore({
            variables: {
                offset: closedPositionsData.positions.length,
                limit: CLOSED_POSITIONS_LIMIT
            }
        }).catch((e) => console.error(e));
        setLimit(closedPositionsData.positions.length + CLOSED_POSITIONS_LIMIT);
    };

    useEffect(() => {
        refetch_open_signals();
        refetch_open();
        refetch_closed();
    }, [refetch_closed, refetch_open, refetch_open_signals, isUserSubscribed]);

    const signals = useMemo(
        () => (!loadingOpenSignals && signalsData?.positions ? getAlerts(signalsData?.positions) : []),
        [loadingOpenSignals, signalsData?.positions]
    );

    const recordsCount = useMemo(
        () => (!loadingAggregate && aggrData ? aggrData.positions_aggregate.aggregate.count : 0),
        [aggrData, loadingAggregate]
    );

    return {
        loading: loadingOpenSignals || loadingOpenPositions || loadingClosedPositions || loadingAggregate,
        openPositions: openPositionsData?.positions || [],
        closedPositions: closedPositionsData?.positions || [],
        signals,
        recordsCount,
        handleLoadMore,
        isLoadingMore
    };
};

export default useFetchSignalRobotPositions;
