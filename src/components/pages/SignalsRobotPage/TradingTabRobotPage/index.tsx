import React, { memo } from 'react';

import { CandleChart } from './CandleChart';
import { LoadingIndicator } from '../../../common';
import { floatPositions } from '../helpers';
import { useFecthPositionData } from './useFetchPositionData';
import { ClosedPositionContainer } from './ClosedPositionContainer';
// import { OpenPositionContainer } from './OpenPositionContainer';
import styles from './index.module.css';

interface Props {
  robotData: any;
}

const _TradingTabRobotPage: React.FC<Props> = ({ robotData }) => {
  const { user_signals: userSignals, robot } = robotData;
  const { isUserSignals } = robot;
  const {
    loading, handleLoadMore, isLoadingMore, dataOpenPositions,
    formatDataClosedPositions, formatSignals, quantyRecords
  } = useFecthPositionData(isUserSignals, userSignals, robot);

  return (
    <>
      <CandleChart
        robot={robot}
        signals={formatSignals} />
      { loading ? <LoadingIndicator /> : (
        <>
          {/* <div className={styles.container}>
            { Object.keys(floatPositions).map(key => (
              <OpenPositionContainer
                key={key}
                robot={robot}
                data={key === 'signals'
                  ? formatSignals
                  : (dataOpenPositions && dataOpenPositions.robot_positions.length) ? dataOpenPositions.robot_positions : []}
                positionInfo={floatPositions[key]} />
            )) }
          </div> */}
          <ClosedPositionContainer
            robot={robot}
            handleLoadMore={handleLoadMore}
            data={formatDataClosedPositions}
            quantyRecords={quantyRecords}
            isLoadingMore={isLoadingMore} />
        </>
      )}
    </>
  );
};

export const TradingTabRobotPage = memo(_TradingTabRobotPage);
