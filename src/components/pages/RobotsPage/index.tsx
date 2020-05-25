import React from "react";

import useWindowDimensions from "hooks/useWindowDimensions";
import { Template } from "components/layout";
import { PageType } from "config/types";
import { PageToolbar } from "components/common";
import { RobotPerformance } from "components/ui/RobotPerformance";
import { RobotOpenPositions } from "components/ui/RobotOpenPositions";
import { SignalRobots } from "components/ui/SignalsRobots";
import { Modals } from "./Modals";
import styles from "./index.module.css";

export const RobotsPage: React.FC = () => {
    const { width } = useWindowDimensions();

    return (
        <Template
            page={PageType.robots}
            title="Robots"
            subTitle="Automated Trading"
            width={width}
            toolbar={<PageToolbar displayType="robots" />}>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <RobotPerformance width={width} type="robots" />
                </div>
                <div className={styles.wrapper}>
                    <RobotOpenPositions width={width} type="robots" />
                </div>
            </div>
            <SignalRobots width={width} displayType="robots" />
            <Modals />
        </Template>
    );
};
