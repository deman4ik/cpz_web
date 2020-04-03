import React from 'react';

// import { TradingTabRobotPage } from './TradingTabRobotPage';
// import { PerformanceTabRobotPage } from '../../ui/PerformanceTab';
import { TabType } from '../../../config/types';

interface Props {
  robotData: any;
  activeTab: TabType;
}

export const TabsPagesRobotPage: React.FC<Props> = ({ robotData, activeTab }) => (
  <>
    {activeTab === TabType.trading && (
      <div />
      // <TradingTabRobotPage
      //   dimension={dimension}
      //   robotData={robotData} />
    )}
    {/* {activeTab === TabType.publicStatistic && (
      <PerformanceTabRobotPage
        currency={robotData.robot.currency}
        stat={robotData ? robotData.robot : null}
        activeTab={activeTab}
        dimension={dimension} />
    )}
    {activeTab === TabType.myStatistic && (
      <PerformanceTabRobotPage
        currency={robotData.robot.currency}
        stat={robotData.robot.isUserSignals ? robotData.user_signals : null}
        activeTab={activeTab}
        dimension={dimension} />
    )} */}
  </>
);
