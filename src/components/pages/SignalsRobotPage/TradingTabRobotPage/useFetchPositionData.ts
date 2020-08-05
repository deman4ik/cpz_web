/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState, useEffect, useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
// graphql
import { GET_ROBOT_POSITIONS, GET_ROBOT_POSITIONS_NOT_AUTH } from "graphql/robots/queries";
import { ROBOT_POSITIONS_COUNT } from "graphql/signals/queries";
// constants
import { DISPLAY_CLOSED_POSITIONS, POLL_INTERVAL } from "config/constants";
// helpers
import { getFormatDataClosedPositions, getAlerts } from "../helpers";
// context
import { AuthContext } from "libs/hoc/authContext";

export const useFetchPositionData = (isUserSignals, userSignals, robot) => {
    const {
        authState: { isAuth, user_id }
    } = useContext(AuthContext);
    const robotPositionsQuery = isAuth ? GET_ROBOT_POSITIONS : GET_ROBOT_POSITIONS_NOT_AUTH;

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
                key: "robot_positions_open_signals",
                ...vars
            },
            pollInterval: POLL_INTERVAL
        }
    );

    const { data: dataOpenPositions, loading: loadingOpenPositions, refetch: refetch_open } = useQuery(
        robotPositionsQuery,
        {
            variables: {
                robotId: robot.id,
                dateFrom: isUserSignals ? userSignals.subscribed_at : null,
                status: { _eq: "open" },
                orderBy: { entry_date: "desc" },
                key: "robot_positions_open",
                ...vars
            },
            pollInterval: POLL_INTERVAL
        }
    );

    const { data: dataClosedPositions, loading: loadingClosedPositions, fetchMore, refetch: refetch_closed } = useQuery(
        robotPositionsQuery,
        {
            variables: {
                robotId: robot.id,
                dateFrom: isUserSignals ? userSignals.subscribed_at : null,
                status: { _eq: "closed" },
                limit,
                orderBy: { entry_date: "desc" },
                key: "robot_positions",
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
                offset: dataClosedPositions.robot_positions.length,
                limit: DISPLAY_CLOSED_POSITIONS
            },
            updateQuery: (prev: any, { fetchMoreResult }) => {
                setIsLoadingMore(false);
                if (!fetchMoreResult) return prev;
                setLimit(dataClosedPositions.robot_positions.length + DISPLAY_CLOSED_POSITIONS);
                return {
                    robot_positions: [...prev.robot_positions, ...fetchMoreResult.robot_positions]
                };
            }
        });
    };

    useEffect(() => {
        refetch_open_signals();
        refetch_open();
        refetch_closed();
    }, [isUserSignals]);

    const volume = useMemo(() => (isUserSignals ? userSignals.volume : 0), [userSignals]);

    const formatDataClosedPositions = useMemo(
        () =>
            !loadingClosedPositions && dataClosedPositions
                ? getFormatDataClosedPositions(dataClosedPositions, isUserSignals, volume)
                : [],
        [dataClosedPositions, loadingClosedPositions, volume]
    );

    const formatSignals = useMemo(
        () =>
            !loadingOpenSignals &&
            dataSignals &&
            dataSignals.robot_positions.length &&
            Object.keys(dataSignals.robot_positions[0].alerts).length
                ? // Берется первый элемент так как робот работает с первой позицей за раз
                  getAlerts(dataSignals.robot_positions[0])
                : [],
        [loadingOpenSignals, dataSignals]
    );

    const quantyRecords = useMemo(
        () => (!loadingAggregate && dataCount ? dataCount.robot_positions_aggregate.aggregate.count : 0),
        [dataCount, loadingAggregate]
    );

    return {
        loading: loadingOpenSignals || loadingOpenPositions || loadingClosedPositions || loadingAggregate,
        dataOpenPositions,
        formatDataClosedPositions,
        formatSignals,
        quantyRecords,
        handleLoadMore,
        isLoadingMore
    };
};
