/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';

import {
  DISPLAY_CLOSED_POSITIONS,
  POLL_INTERVAL
} from '../../../../config/constants';
import {
  GET_ROBOT_POSITIONS_ROBOT,
  GET_ROBOT_POSITIONS_USER,
  ROBOT_POSITIONS_COUNT_USER
} from '../../../../graphql/robots/queries';
import { ROBOT_POSITIONS_COUNT } from '../../../../graphql/signals/queries';

export const useFetchPositionData = (
  isUserRobot,
  userRobots,
  robot,
  tableName
) => {
  const arrStatus = isUserRobot ? ['closed', 'closedAuto'] : ['closed'];
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [limit, setLimit] = useState(DISPLAY_CLOSED_POSITIONS);

  const { data, loading, fetchMore } = useQuery(
    isUserRobot
      ? GET_ROBOT_POSITIONS_USER('user_positions')
      : GET_ROBOT_POSITIONS_ROBOT('robot_positions'),
    {
      variables: {
        robotId: isUserRobot ? userRobots.id : robot.id,
        status: { _in: arrStatus },
        limit,
        offset: 0,
        orderBy: { entry_date: 'desc' }
      },
      pollInterval: POLL_INTERVAL
    }
  );
  const { data: dataCount, loading: loadingAggregate } = useQuery(
    userRobots ? ROBOT_POSITIONS_COUNT_USER : ROBOT_POSITIONS_COUNT,
    {
      variables: {
        robotId: isUserRobot ? userRobots.id : robot.id,
        status: { _in: arrStatus }
      },
      pollInterval: POLL_INTERVAL
    }
  );
  const { data: dataOpenPos, loading: loadingOpenPos } = useQuery(
    userRobots
      ? GET_ROBOT_POSITIONS_USER('user_positions_open')
      : GET_ROBOT_POSITIONS_ROBOT('robot_positions_open'),
    {
      variables: {
        robotId: isUserRobot ? userRobots.id : robot.id,
        status: { _eq: 'open' },
        orderBy: { entry_date: 'desc' }
      },
      pollInterval: POLL_INTERVAL
    }
  );

  const quantyRecords = useMemo(
    () =>
      !loadingAggregate && dataCount
        ? dataCount[`${tableName}_aggregate`].aggregate.count
        : 0,
    [dataCount, loadingAggregate]
  );

  const handleLoadMore = () => {
    setIsLoadingMore(true);

    fetchMore({
      variables: {
        offset: data[tableName].length,
        limit: DISPLAY_CLOSED_POSITIONS
      },
      updateQuery: (prev: any, { fetchMoreResult }) => {
        setIsLoadingMore(false);
        if (!fetchMoreResult) return prev;
        setLimit(data[tableName].length + DISPLAY_CLOSED_POSITIONS);
        return {
          [tableName]: [...prev[tableName], ...fetchMoreResult[tableName]]
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
