import React from "react";

import TradingTab from "components/pages/common/TradingTab";
import { PerformanceTab } from "components/ui/PerformanceTab";
import TabNavigation from "components/basic/TabNavigation";
import useFetchSignalRobotPositions from "../../SignalRobotPage/useFetchSignalRobotPositions";
import useFetchTradingRobotPositions from "components/pages/TradingRobotPage/useFetchTradingRobotPositions";
import { RobotsType } from "config/types";

interface Props {
    type: RobotsType;
    robotData: any;
    width: number;
}

const PageContent: React.FC<Props> = ({ type, robotData, width }) => {
    const typeIsSignals = type === RobotsType.signals;

    const { user_signals: userSignals, userRobot, robot } = robotData;
    const { isUserSubscribed, isOwnedByUser } = robot;

    const fetchPositions = typeIsSignals ? useFetchSignalRobotPositions : useFetchTradingRobotPositions;
    const robotOwned = typeIsSignals ? userSignals : userRobot || null;

    const tradingPageData = fetchPositions(robotData, true);

    const tabSchema = [
        {
            title: "Trading",
            tabPage: <TradingTab type={type} tradingData={tradingPageData} robotData={robotData} width={width} />
        },
        ...(isUserSubscribed || isOwnedByUser
            ? [
                  {
                      title: "My Performance",
                      tabPage: <PerformanceTab fullStats={robotOwned && robotOwned.fullStats} />
                  }
              ]
            : []),
        {
            title: "Public Performance",
            tabPage: <PerformanceTab fullStats={robotData ? robot?.fullStats : null} />
        }
    ];

    return <TabNavigation tabSchema={tabSchema} />;
};

export default PageContent;
