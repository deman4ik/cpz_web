import React from "react";

import { TradingTabRobotPage } from "./TradingTabRobotPage";
import { PerformanceTab } from "components/ui/PerformanceTab";
import { TabType } from "config/types";

interface Props {
    robotData: any;
    activeTab: TabType;
    width: number;
}

export const Tabs: React.FC<Props> = ({ robotData, activeTab, width }) => (
    <>
        {activeTab === TabType.trading && <TradingTabRobotPage robotData={robotData} width={width} />}
        {activeTab === TabType.publicStatistic && (
            <PerformanceTab stat={robotData ? robotData.robot : null} activeTab={activeTab} width={width} />
        )}
        {activeTab === TabType.myStatistic && (
            <PerformanceTab
                stat={robotData.user_robots ? robotData.user_robots : null}
                activeTab={activeTab}
                width={width}
            />
        )}
    </>
);
