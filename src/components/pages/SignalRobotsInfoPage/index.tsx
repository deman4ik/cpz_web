/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import React from "react";
import { DefaultTemplate } from "components/layout";

import useWindowDimensions from "hooks/useWindowDimensions";
import { PageType } from "config/types";
import { PageToolbar } from "components/common/PageToolbar";

// components
import TabNavigation from "components/basic/TabNavigation";
import { RobotPerformance } from "components/ui/RobotPerformance";
import { RobotOpenPositions } from "components/ui/RobotOpenPositions";
import { SignalRobots } from "components/ui/SignalsRobots";

export const SignalRobotsInfoPage = () => {
    const { width } = useWindowDimensions();

    const pageType = "signals";

    const tabSchema = [
        {
            title: "Open Positions",
            tabPage: <RobotOpenPositions width={width} type={pageType} />
        },
        {
            title: "Total Performance",
            tabPage: <RobotPerformance width={width} type={pageType} />
        },
        {
            title: "Signal Robots",
            tabPage: <SignalRobots width={width} type={pageType} />
        }
    ];

    return (
        <DefaultTemplate
            page={PageType.signals}
            title="Signals"
            subTitle="Manual Trading"
            width={width}
            toolbar={<PageToolbar displayType="signals" />}>
            <TabNavigation tabSchema={tabSchema} />
        </DefaultTemplate>
    );
};
