import React from "react";

import { TradingTabRobotPage } from "./TradingTabRobotPage";
import { PerformanceTabRobotPage } from "components/ui/PerformanceTab";
import { TabType } from "config/types";

interface Props {
    robotData: any;
    activeTab: TabType;
    width: number;
}

export const TabsPagesRobotPage: React.FC<Props> = ({ robotData, activeTab, width }) => (
    <>
        {activeTab === TabType.trading && <TradingTabRobotPage robotData={robotData} width={width} />}
        {activeTab === TabType.publicStatistic && (
            <PerformanceTabRobotPage stat={robotData ? robotData.robot : null} activeTab={activeTab} width={width} />
        )}
        {activeTab === TabType.myStatistic && (
            <PerformanceTabRobotPage
                stat={robotData.robot.isUserSignals ? robotData.user_signals : null}
                activeTab={activeTab}
                width={width}
            />
        )}
    </>
);
