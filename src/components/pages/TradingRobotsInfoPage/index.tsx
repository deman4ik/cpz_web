import React from "react";
import useWindowDimensions from "hooks/useWindowDimensions";

// types
import { PageType } from "config/types";

// components
import { DefaultTemplate } from "components/layout";
import { PageToolbar } from "components/common";
import { RobotPerformance } from "components/ui/RobotPerformance";
import { RobotOpenPositions } from "components/ui/RobotOpenPositions";
import { SignalRobots } from "components/ui/SignalsRobots";
import TabNavigation from "components/basic/TabNavigation";

export const RobotsPage: React.FC = () => {
    const { width } = useWindowDimensions();

    const tabSchema = [
        {
            title: "Open Positions",
            tabPage: <RobotOpenPositions type="robots" />
        },
        {
            title: "Total Performance",
            tabPage: <RobotPerformance width={width} type="robots" />
        },
        {
            title: "Trading robots",
            tabPage: <SignalRobots width={width} type="robots" />
        }
    ];

    return (
        <DefaultTemplate
            page={PageType.robots}
            title="Robots"
            subTitle="Automated Trading"
            width={width}
            toolbar={<PageToolbar displayType="robots" />}>
            <TabNavigation tabSchema={tabSchema} />
        </DefaultTemplate>
    );
};
