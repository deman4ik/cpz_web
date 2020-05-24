import React from "react";

import useWindowDimensions from "../../../hooks/useWindowDimensions";
import { Template } from "../../layout";
import { PageType } from "../../../config/types";
import { PageToolbar } from "../../common";
import { RobotPerformance } from "../../ui/RobotPerformance";
import { RobotOpenPositions } from "../../ui/RobotOpenPositions";
import { SignalRobots } from "../../ui/SignalsRobots";
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
