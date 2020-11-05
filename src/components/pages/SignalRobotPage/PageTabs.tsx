import React from "react";

import { TradingTabRobotPage } from "./TradingTab";
import { PerformanceTab } from "components/ui/PerformanceTab";
import TabNavigation from "components/basic/TabNavigation";

interface Props {
    robotData: any;
    width: number;
    isUserSubscribed: boolean;
}

export const PageTabs: React.FC<Props> = ({ robotData, width, isUserSubscribed }) => {
    const tabSchema = [
        {
            title: "Trading",
            tabPage: <TradingTabRobotPage robotData={robotData} width={width} />
        },
        ...(isUserSubscribed
            ? [
                  {
                      title: "My Performance",
                      tabPage: (
                          <PerformanceTab
                              robot={robotData.robot.isUserSubscribed ? robotData.user_signals : null}
                              width={width}
                          />
                      )
                  }
              ]
            : []),
        {
            title: "Public Performance",
            tabPage: <PerformanceTab robot={robotData ? robotData.robot : null} width={width} />
        }
    ];

    return <TabNavigation tabSchema={tabSchema} />;
};
