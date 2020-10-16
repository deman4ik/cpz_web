import React from "react";

import { TradingTabRobotPage } from "./TradingTab";
import { PerformanceTab } from "components/ui/PerformanceTab";
import { TabType } from "config/types";

interface Props {
    robotData: any;
    activeTab: TabType;
    width: number;
}

export const PageTabs: React.FC<Props> = ({ robotData, activeTab, width }) => (
    <>
        {activeTab === TabType.trading && <TradingTabRobotPage robotData={robotData} width={width} />}
        {activeTab === TabType.publicStatistic && (
            <PerformanceTab robot={robotData ? robotData.robot : null} activeTab={activeTab} width={width} />
        )}
        {activeTab === TabType.myStatistic && (
            <PerformanceTab
                robot={robotData.robot.isUserSubscribed ? robotData.user_signals : null}
                activeTab={activeTab}
                width={width}
            />
        )}
    </>
);
