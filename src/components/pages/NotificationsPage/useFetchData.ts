/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { GET_NOTIFICATIONS, GET_NOTIFICATIONS_AGGREGATE } from '../../../graphql/user/queries';
import { UPDATE_NOTIFICATIONS } from '../../../graphql/user/mutations';
import { POLL_INTERVAL } from '../../../config/constants';
import { getFormatData } from './helpers';

const RECORDS_LIMIT = 10;
export const useFetchData = () => {
  const [ isLoadingMore, setIsLoadingMore ] = useState(false);
  const [ limit, setLimit ] = useState(RECORDS_LIMIT);
  const { data, loading, fetchMore, refetch } = useQuery(GET_NOTIFICATIONS, {
    variables: {
      offset: 0,
      limit
    },
    pollInterval: POLL_INTERVAL
  });

  const [ updateReaded ] = useMutation(UPDATE_NOTIFICATIONS, {
    refetchQueries: [ {
      query: GET_NOTIFICATIONS_AGGREGATE,
      variables: {
        where: { readed: { _eq: false } }
      }
    } ]
  });

  const { data: dataCount, loading: loadingCount } = useQuery(GET_NOTIFICATIONS_AGGREGATE);

  const handleLoadMore = () => {
    setIsLoadingMore(true);

    fetchMore({
      variables: {
        offset: data.notifications.length,
        limit: RECORDS_LIMIT
      },
      updateQuery: (prev: any, { fetchMoreResult }) => {
        setIsLoadingMore(false);
        if (!fetchMoreResult) return prev;
        setLimit(data.notifications.length + RECORDS_LIMIT);
        return { notifications: [ ...prev.notifications, ...fetchMoreResult.notifications ] };
      }
    });
  };

  const formatData = useMemo(() => (
    (!loading && data) ? getFormatData(data.notifications) : []
  ), [ data, loading ]);

  const recordsCount = useMemo(() => (
    (!loadingCount && dataCount) ? dataCount.notifications_aggregate.aggregate.count : 0
  ), [ loadingCount, dataCount ]);

  useEffect(() => {
    const unreadData = formatData.filter(el => !el.readed).map(el => el.id);
    if (unreadData.length) {
      updateReaded({
        variables: {
          _set: { readed: true },
          where: { id: { _in: unreadData } }
        }
      });
    }
  }, [ formatData ]);

  useEffect(() => {
    refetch();
  }, []);

  return { isLoadingMore, recordsCount, formatData, handleLoadMore, loading: loading || loadingCount };
};
