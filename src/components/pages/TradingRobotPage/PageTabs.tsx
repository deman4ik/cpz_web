import React from "react";

import { TradingTab } from "./TradingTab";
import { PerformanceTab } from "components/ui/PerformanceTab";
import TabNavigation from "components/basic/TabNavigation";

interface Props {
    robotData: any;
    width: number;
    isOwnedByUser: boolean;
}

export const PageTabs: React.FC<Props> = ({ robotData, width, isOwnedByUser }) => {
    const { robot, userRobot } = robotData;

    const tabSchema = [
        {
            title: "Trading",
            tabPage: <TradingTab robotData={robotData} width={width} />
        },
        ...(isOwnedByUser
            ? [
                  {
                      title: "My Performance",
                      tabPage: <PerformanceTab robot={userRobot} width={width} />
                  }
              ]
            : []),
        {
            title: "Public Performance",
            tabPage: <PerformanceTab robot={robot} width={width} />
        }
    ];

    return <TabNavigation tabSchema={tabSchema} />;
};
