/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_ROBOTS_BY_STATS as GET_ROBOTS_BY_STATS_SIGNALS, ROBOT_AGGREGATE_COUNT } from '../graphql/signals/queries';
import { GET_ROBOTS_BY_STATS as GET_ROBOTS_BY_STATS_ROBOTS } from '../graphql/robots/queries';
import { POLL_INTERVAL } from '../config/constants';

const SHOW_LIMIT = 12;
const queryKey = {
  signals: 'signals',
  robots: 'trading'
};

export const useFetchRobots = (
  dispayType: string,
  searchText: string,
  formatRobotsData: (v_robots_stats: any) => {}
) => {
  const [ limit, setLimit ] = useState(SHOW_LIMIT);
  const [ counts, setCounts ] = useState(0);
  const { data: data_count, loading: loading_aggregate, refetch: refetchCounts } = useQuery(
    ROBOT_AGGREGATE_COUNT, {
      variables: {
        where: {
          name: { _ilike: searchText ? `%${searchText}%` : null },
          [queryKey[dispayType]]: { _eq: true }
        }
      },
      pollInterval: POLL_INTERVAL,
    }
  );

  const { data, loading, error, fetchMore, refetch: refetchStats } = useQuery(
    dispayType === 'signals' ? GET_ROBOTS_BY_STATS_SIGNALS : GET_ROBOTS_BY_STATS_ROBOTS, {
      variables: {
        offset: 0,
        limit,
        name: searchText ? `%${searchText}%` : null
      },
      pollInterval: POLL_INTERVAL,
    }
  );

  const robotsData = useMemo(() => (
    (!loading && data) ? formatRobotsData(data.v_robots_stats) : []
  ), [ loading, data ]);

  useEffect(() => {
    if (!loading_aggregate && data_count && data_count.robots_aggregate && data_count.robots_aggregate.aggregate) {
      setCounts(data_count.robots_aggregate.aggregate.count);
    }
  }, [ loading_aggregate, data_count ]);


  useEffect(() => {
    refetchStats();
    refetchCounts();
  }, [ searchText ]);

  const [ isLoadingMore, setIsLoadingMore ] = useState(false);

  const onFetchMore = () => {
    setIsLoadingMore(true);
    fetchMore({
      variables: {
        offset: data.v_robots_stats.length,
        limit: SHOW_LIMIT
      },
      updateQuery: (prev: any, { fetchMoreResult }) => {
        setIsLoadingMore(false);
        if (!fetchMoreResult) return prev;
        setLimit(data.v_robots_stats.length + SHOW_LIMIT);
        return { v_robots_stats: [ ...prev.v_robots_stats, ...fetchMoreResult.v_robots_stats ] };
      }
    });
  };

  return { robotsData, error, counts, loading, loading_aggregate, isLoadingMore, onFetchMore };
};
