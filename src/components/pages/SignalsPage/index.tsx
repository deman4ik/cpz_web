/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import React from "react";
import { DefaultTemplate } from "components/layout";

import useWindowDimensions from "hooks/useWindowDimensions";
import { PageType } from "config/types";
import { RobotPerformance } from "components/ui/RobotPerformance";
import { RobotOpenPositions } from "components/ui/RobotOpenPositions";
import { SignalRobots } from "components/ui/SignalsRobots";
import { PageToolbar } from "components/common/PageToolbar";
import { Modals } from "./Modals";
import styles from "./index.module.css";

export const SignalsPage = () => {
    const { width } = useWindowDimensions();

    return (
        <DefaultTemplate
            page={PageType.signals}
            title="Signals"
            subTitle="Manual Trading"
            toolbar={<PageToolbar displayType="signals" />}
            width={width}>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <RobotPerformance width={width} type="signals" />
                </div>
                <div className={styles.wrapper}>
                    <RobotOpenPositions width={width} type="signals" />
                </div>
            </div>
            <SignalRobots width={width} displayType="signals" />
            <Modals />
        </DefaultTemplate>
    );
};
