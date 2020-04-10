import React, { memo } from 'react';

import { CandleChart } from './CandleChart';
import { useFetchPositionData } from './useFetchPositionData';
import { ClosedPositionContainer } from './ClosedPositionContainer';
import { OpenPositionContainer } from './OpenPositionContainer';
import { LoadingIndicator } from '../../../common';

interface Props {
  robotData: any;
  width: number;
}

const _TradingTabRobotPage: React.FC<Props> = ({ robotData, width }) => {
  const { user_robots: userRobots, robot } = robotData;
  const { isUserRobot } = robot;
  const tableName = isUserRobot ? 'user_positions' : 'robot_positions';
  const { data, isLoadingMore, quantyRecords, dataOpenPos, handleLoadMore, loading } = useFetchPositionData(isUserRobot, userRobots, robot, tableName);

  return (
    <>
      <CandleChart
        robot={robot}
        userRobots={userRobots}
        width={width} />
      { loading ? <LoadingIndicator /> : (
        <>
          <OpenPositionContainer
            robot={robot}
            data={dataOpenPos}
            tableName={tableName} />
          <ClosedPositionContainer
            robot={robot}
            handleLoadMore={handleLoadMore}
            data={data}
            quantyRecords={quantyRecords}
            width={width}
            tableName={tableName}
            isLoadingMore={isLoadingMore} />
        </>
      )}
    </>
  );
};

export const TradingTabRobotPage = memo(_TradingTabRobotPage);
