import React, { memo, useMemo, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { CandleChart } from './CandleChart';
import { DISPLAY_CLOSED_POSITIONS, POLL_INTERVAL } from '../../../../config/constants';
import { GET_ROBOT_POSITIONS_ROBOT, GET_ROBOT_POSITIONS_USER,
  ROBOT_POSITIONS_COUNT_USER } from '../../../../graphql/robots/queries';
import { ROBOT_POSITIONS_COUNT } from '../../../../graphql/signals/queries';
// import { ClosedPositionContainer } from './ClosedPositionContainer';
// import { OpenPositionContainer } from './OpenPositionContainer';
import { LoadingIndicator } from '../../../common';

interface Props {
  robotData: any;
  width: number;
}

const _TradingTabRobotPage: React.FC<Props> = ({ robotData, width }) => {
  const { user_robots: userRobots, robot } = robotData;
  const { isUserRobot } = robot;
  const tableName = isUserRobot ? 'user_positions' : 'robot_positions';
  const arrStatus = isUserRobot ? [ 'closed', 'closedAuto' ] : [ 'closed' ];
  const [ isLoadingMore, setIsLoadingMore ] = useState(false);
  const [ limit, setLimit ] = useState(DISPLAY_CLOSED_POSITIONS);
  const { data, loading, fetchMore } = useQuery(
    isUserRobot ? GET_ROBOT_POSITIONS_USER('user_positions') : GET_ROBOT_POSITIONS_ROBOT('robot_positions'), {
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
    userRobots ? ROBOT_POSITIONS_COUNT_USER : ROBOT_POSITIONS_COUNT, {
      variables: {
        robotId: isUserRobot ? userRobots.id : robot.id,
        status: { _in: arrStatus }
      },
      pollInterval: POLL_INTERVAL
    }
  );
  const { data: dataOpenPos, loading: loadingOpenPos } = useQuery(
    userRobots ? GET_ROBOT_POSITIONS_USER('user_positions_open') : GET_ROBOT_POSITIONS_ROBOT('robot_positions_open'), {
      variables: {
        robotId: isUserRobot ? userRobots.id : robot.id,
        status: { _eq: 'open' },
        orderBy: { entry_date: 'desc' }
      },
      pollInterval: POLL_INTERVAL
    }
  );

  const quantyRecords = useMemo(() =>
    (!loadingAggregate ? dataCount[`${tableName}_aggregate`].aggregate.count : 0), [ dataCount, loadingAggregate ]);

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
        return { [tableName]: [ ...prev[tableName], ...fetchMoreResult[tableName] ] };
      }
    });
  };

  return (
    <>
      <CandleChart
        robot={robot}
        userRobots={userRobots}
        width={width} />
      { (loading || loadingAggregate || loadingOpenPos) ? <LoadingIndicator /> : (
        <>
          {/* <OpenPositionContainer
            robot={robot}
            data={dataOpenPos}
            tableName={tableName} />
          <ClosedPositionContainer
            robot={robot}
            handleLoadMore={handleLoadMore}
            data={data}
            quantyRecords={quantyRecords}
            maxTablet={maxTablet}
            tableName={tableName}
            isLoadingMore={isLoadingMore} /> */}
        </>
      )}
    </>
  );
};

export const TradingTabRobotPage = memo(_TradingTabRobotPage);
