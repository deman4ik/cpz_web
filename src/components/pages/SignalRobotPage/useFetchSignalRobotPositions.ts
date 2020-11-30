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
import { useScrollPosition } from "hooks/useScrollPosition";

const useFetchSignalRobotPositions = (robotData, preserveScrollPosition?: boolean) => {
    const { preservePosition, restorePosition } = useScrollPosition();

    const {
        authState: { isAuth, user_id }
    } = useContext(AuthContext);

    const { user_signals: userRobot, robot } = robotData;
    const { isUserSubscribed } = robot;
    const robotPositionsQuery = isAuth && isUserSubscribed ? SIGNAL_POSITIONS_FOR_USER : ROBOT_POSITIONS_IN_INTERVAL;

    const [limit, setLimit] = useState(CLOSED_POSITIONS_LIMIT);
    const [loadingMore, setLoadingMore] = useState(false);
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

    const [closedPositions, setClosedPositions] = useState([]);
    useEffect(() => {
        if (preserveScrollPosition) restorePosition();
    }, [preserveScrollPosition, restorePosition, closedPositions]);

    const { data: closedPositionsData, fetchMore, refetch: refetch_closed } = useQuery(robotPositionsQuery, {
        variables: {
            robotId: robot.id,
            dateFrom: isUserSubscribed ? userRobot.subscribed_at : null,
            status: { _eq: "closed" },
            limit,
            orderBy: { entry_date: "desc" },
            ...queryVars
        },
        pollInterval: POLL_INTERVAL,
        onCompleted: () => {
            if (preserveScrollPosition) preservePosition();
            setClosedPositions(closedPositionsData?.positions);
        }
    });

    const { data: aggrData, loading: loadingAggregate } = useQuery(SIGNAL_ROBOT_POSITIONS_AGGREGATE, {
        variables: {
            robotId: robot.id,
            dateFrom: isUserSubscribed ? userRobot.subscribed_at : null,
            status: { _eq: "closed" }
        },
        pollInterval: POLL_INTERVAL
    });

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
        loading: loadingOpenSignals || loadingOpenPositions || loadingAggregate,
        openPositions: openPositionsData?.positions || [],
        closedPositions,
        signals,
        recordsCount,
        handleLoadMore,
        isLoadingMore: loadingMore
    };
};

export default useFetchSignalRobotPositions;
