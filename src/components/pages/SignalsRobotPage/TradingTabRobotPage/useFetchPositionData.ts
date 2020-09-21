import { useMemo, useState, useEffect, useContext } from "react";
import { useQuery } from "@apollo/client";
// graphql
import { GET_SIGNAL_ROBOT_POSITIONS_FOR_USER, GET_ROBOT_POSITIONS_NOT_AUTH } from "graphql/robots/queries";
import { ROBOT_POSITIONS_COUNT } from "graphql/signals/queries";
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
    const robotPositionsQuery = isAuth ? GET_SIGNAL_ROBOT_POSITIONS_FOR_USER : GET_ROBOT_POSITIONS_NOT_AUTH;

    const [limit, setLimit] = useState(DISPLAY_CLOSED_POSITIONS);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const vars = isAuth ? { user_id } : null;
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

    const { data: dataCount, loading: loadingAggregate } = useQuery(ROBOT_POSITIONS_COUNT, {
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
                offset: closedPositionsData.v_user_signal_positions.length,
                limit: DISPLAY_CLOSED_POSITIONS
            },
            updateQuery: (prev: any, { fetchMoreResult }) => {
                setIsLoadingMore(false);
                if (!fetchMoreResult) return prev;
                setLimit(closedPositionsData.v_user_signal_positions.length + DISPLAY_CLOSED_POSITIONS);
                return {
                    robot_positions: [...prev.v_user_signal_positions, ...fetchMoreResult.v_user_signal_positions]
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
        () =>
            !loadingOpenSignals && dataSignals?.v_user_signal_positions
                ? getAlerts(dataSignals?.v_user_signal_positions)
                : [],
        [loadingOpenSignals, dataSignals?.v_user_signal_positions]
    );

    const recordsCount = useMemo(
        () => (!loadingAggregate && dataCount ? dataCount.v_robot_positions_aggregate.aggregate.count : 0),
        [dataCount, loadingAggregate]
    );

    return {
        loading: loadingOpenSignals || loadingOpenPositions || loadingClosedPositions || loadingAggregate,
        openPositions: openPositionsData?.v_user_signal_positions || [],
        closedPositions: closedPositionsData?.v_user_signal_positions || [],
        signals,
        recordsCount,
        handleLoadMore,
        isLoadingMore
    };
};
