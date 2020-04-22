/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { GET_ROBOTS_BY_STATS as GET_ROBOTS_BY_STATS_SIGNALS, ROBOT_AGGREGATE_COUNT } from '../graphql/signals/queries';
import { GET_ROBOTS_BY_STATS as GET_ROBOTS_BY_STATS_ROBOTS } from '../graphql/robots/queries';
import { GET_SEARCH_PROPS, GET_SEARCH_LIMIT } from '../graphql/local/queries';
import { SET_SEARCH_LIMIT } from '../graphql/local/mutations';
import { POLL_INTERVAL } from '../config/constants';
import { getHash, getSearchProps } from '../config/utils';

const SHOW_LIMIT = 12;
const queryKey = {
  signals: 'signals',
  robots: 'trading'
};

const queryFilter = {
  signals: () => ({ signals: { _eq: true } }),
  robots: () => ({ trading: { _eq: true } })
};

const defaultOrderBy = {
  recovery_factor: 'desc_nulls_last', id: 'asc'
};

export const useFetchRobots = (
  dispayType: string,
  formatRobotsData: (v_robots_stats: any) => {}
) => {
  const [ counts, setCounts ] = useState(0);
  const { data: searchProps } = useQuery(GET_SEARCH_PROPS);
  const { data: searchLimit } = useQuery(GET_SEARCH_LIMIT);
  const [ limit, setLimit ] = useState(searchLimit.Limit[dispayType]);
  const [ filtersQuery, setFiltersQuery ] = useState({ robots: {}, hash: '', order_by: {} });
  const [ setSearchLimit ] = useMutation(SET_SEARCH_LIMIT);

  const { data: data_count, loading: loading_aggregate, refetch: refetchCounts } = useQuery(
    ROBOT_AGGREGATE_COUNT, {
      variables: {
        where: {
          [queryKey[dispayType]]: { _eq: true },
          ...filtersQuery.robots,
        },
        hash: filtersQuery.hash
      },
      pollInterval: POLL_INTERVAL,
    }
  );

  const { data, loading, error, fetchMore, refetch: refetchStats } = useQuery(
    dispayType === 'signals' ? GET_ROBOTS_BY_STATS_SIGNALS : GET_ROBOTS_BY_STATS_ROBOTS, {
      variables: {
        offset: 0,
        limit,
        hash: filtersQuery.hash,
        order_by: filtersQuery.order_by,
        where: {
          robots: {
            ...queryFilter[dispayType](),
            ...filtersQuery.robots
          }
        }
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
    const addFields = () => {
      const hash = getHash(30);
      const search = getSearchProps(searchProps, dispayType);
      const result: { robots: any; hash: string; order_by: any } = (!search || !search.filters)
        ? { robots: {}, hash, order_by: defaultOrderBy }
        : { robots: { ...JSON.parse(search.filters) }, hash, order_by: defaultOrderBy };

      result.order_by = (search && search.orders) ? JSON.parse(search.orders) : defaultOrderBy;
      return result;
    };

    setFiltersQuery(addFields());
  }, [ searchProps ]);

  useEffect(() => {
    refetchStats();
    refetchCounts();
  }, [ filtersQuery ]);

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
        setSearchLimit({
          variables: { limit: data.v_robots_stats.length + SHOW_LIMIT, type: dispayType }
        });
        return { v_robots_stats: [ ...prev.v_robots_stats, ...fetchMoreResult.v_robots_stats ] };
      }
    });
  };

  return { robotsData, error, counts, loading: loading || loading_aggregate, isLoadingMore, onFetchMore };
};
