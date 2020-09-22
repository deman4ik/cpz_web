import { useMemo, useState, useEffect, useContext } from "react";
import { useQuery } from "@apollo/client";
// graphql
import { SIGNAL_POSITIONS_FOR_USER, ROBOT_POSITIONS_IN_INTERVAL } from "graphql/robots/queries";
import { SIGNAL_ROBOT_POSITIONS_AGGREGATE } from "graphql/signals/queries";
// constants
import { DISPLAY_CLOSED_POSITIONS, POLL_INTERVAL } from "config/constants";
// helpers
import { getAlerts } from "../helpers";
// context
import { AuthContext } from "libs/hoc/context";

export const useFetchPositionData = (isUserSignals, userSignals, robot) => {
    const {
        authState: { isAuth, user_id }
    } = useContext(AuthContext);
    const robotPositionsQuery = isAuth && isUserSignals ? SIGNAL_POSITIONS_FOR_USER : ROBOT_POSITIONS_IN_INTERVAL;

    const [limit, setLimit] = useState(DISPLAY_CLOSED_POSITIONS);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const vars = isAuth && isUserSignals ? { user_id } : null;
    const { data: dataSignals, loading: loadingOpenSignals, refetch: refetch_open_signals } = useQuery(
        robotPositionsQuery,
        {
            variables: {
                robotId: robot.id,
                dateFrom: isUserSignals ? userSignals.subscribed_at : null,
                status: { _in: ["new", "open"] },
                orderBy: { entry_date: "desc" },
                ...vars
            },
            pollInterval: POLL_INTERVAL
        }
    );

    const { data: openPositionsData, loading: loadingOpenPositions, refetch: refetch_open } = useQuery(
        robotPositionsQuery,
        {
            variables: {
                robotId: robot.id,
                dateFrom: isUserSignals ? userSignals.subscribed_at : null,
                status: { _eq: "open" },
                orderBy: { entry_date: "desc" },
                ...vars
            },
            pollInterval: POLL_INTERVAL
        }
    );

    const { data: closedPositionsData, loading: loadingClosedPositions, fetchMore, refetch: refetch_closed } = useQuery(
        robotPositionsQuery,
        {
            variables: {
                robotId: robot.id,
                dateFrom: isUserSignals ? userSignals.subscribed_at : null,
                status: { _eq: "closed" },
                limit,
                orderBy: { entry_date: "desc" },
                ...vars
            },
            pollInterval: POLL_INTERVAL
        }
    );

    const { data: dataCount, loading: loadingAggregate } = useQuery(SIGNAL_ROBOT_POSITIONS_AGGREGATE, {
        variables: {
            robotId: robot.id,
            dateFrom: isUserSignals ? userSignals.subscribed_at : null,
            status: { _eq: "closed" }
        },
        pollInterval: POLL_INTERVAL
    });

    const handleLoadMore = () => {
        setIsLoadingMore(true);
        fetchMore({
            variables: {
                offset: closedPositionsData.positions.length,
                limit: DISPLAY_CLOSED_POSITIONS
            },
            updateQuery: (prev: any, { fetchMoreResult }) => {
                setIsLoadingMore(false);
                if (!fetchMoreResult) return prev;
                setLimit(closedPositionsData.positions.length + DISPLAY_CLOSED_POSITIONS);
                return {
                    robot_positions: [...prev.positions, ...fetchMoreResult.positions]
                };
            }
        });
    };

    useEffect(() => {
        refetch_open_signals();
        refetch_open();
        refetch_closed();
    }, [refetch_closed, refetch_open, refetch_open_signals, isUserSignals]);

    const signals = useMemo(
        () => (!loadingOpenSignals && dataSignals?.positions ? getAlerts(dataSignals?.positions) : []),
        [loadingOpenSignals, dataSignals?.positions]
    );

    const recordsCount = useMemo(
        () => (!loadingAggregate && dataCount ? dataCount.v_robot_positions_aggregate.aggregate.count : 0),
        [dataCount, loadingAggregate]
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
