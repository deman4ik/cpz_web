import { useMemo, useState } from "react";
import { useQuery } from "@apollo/client";

import { CLOSED_POSITIONS_LIMIT, POLL_INTERVAL } from "config/constants";

import { BACKTEST_POSITIONS, BACKTEST_POSITIONS_AGGREGATE } from "graphql/robots/backtest";

const useFetchBackTestPosition = (backTestData: any): any => {
    const { id: backtest_id } = backTestData;

    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [limit, setLimit] = useState(CLOSED_POSITIONS_LIMIT);

    const queryVars = {
        backtest_id,
        status: { _eq: "closed" },
        limit,
        offset: 0,
        orderBy: { entry_date: "desc" }
    };

    const { data: closedPositionsData, loading, fetchMore } = useQuery(BACKTEST_POSITIONS, {
        variables: queryVars,
        pollInterval: POLL_INTERVAL
    });

    const { data: aggrData, loading: loadingAggregate } = useQuery(BACKTEST_POSITIONS_AGGREGATE, {
        variables: {
            backtest_id,
            status: { _eq: "closed" }
        },
        pollInterval: POLL_INTERVAL
    });

    const openPositionsQueryVars = {
        backtest_id,
        status: { _eq: "open" },
        orderBy: { entry_date: "desc" }
    };

    const { data: openPositionsData, loading: loadingOpenPos } = useQuery(BACKTEST_POSITIONS, {
        variables: openPositionsQueryVars,
        pollInterval: POLL_INTERVAL
    });

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
        }).catch((e) => console.error(e));
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

export default useFetchBackTestPosition;
