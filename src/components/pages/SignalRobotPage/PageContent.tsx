import React from "react";

import { TradingTab } from "./TradingTab";
import { PerformanceTab } from "components/ui/PerformanceTab";
import TabNavigation from "components/basic/TabNavigation";
import useFetchPositionData from "./useFetchPositionData";

interface Props {
    robotData: any;
    width: number;
}

const PageContent: React.FC<Props> = ({ robotData, width }) => {
    const { user_signals: userSignals, robot } = robotData;
    const { isUserSubscribed } = robot;

    console.log("render");

    const tradingPageData = useFetchPositionData(isUserSubscribed, userSignals, robot);

    const tabSchema = [
        {
            title: "Trading",
            tabPage: <TradingTab data={tradingPageData} robot={robot} width={width} />
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

export default PageContent;
