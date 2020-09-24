import React from "react";

import { TradingTab } from "./TradingTab";
import { PerformanceTab } from "components/ui/PerformanceTab";
import { TabType } from "config/types";

interface Props {
    robotData: any;
    activeTab: TabType;
    width: number;
}

export const PageTabs: React.FC<Props> = ({ robotData, activeTab, width }) => {
    const { robot, userRobot } = robotData;
    return (
        <>
            {activeTab === TabType.trading && <TradingTab robotData={robotData} width={width} />}
            {activeTab === TabType.publicStatistic && (
                <PerformanceTab stat={robot} activeTab={activeTab} width={width} />
            )}
            {activeTab === TabType.myStatistic && (
                <PerformanceTab stat={userRobot} activeTab={activeTab} width={width} />
            )}
        </>
    );
};
