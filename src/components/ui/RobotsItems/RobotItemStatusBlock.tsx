import React from "react";

import styles from "./RobotsItem.module.css";
import { StatisticElement } from "components/ui/RobotsItems/StatisticsElement";
import { capitalize } from "lodash";
import { RobotsType } from "config/types";

interface Props {
    item: any;
    displayType: string;
}

export const RobotItemStatusBlock: React.FC<Props> = ({ item, displayType }) => {
    const typeIsSignals = displayType === RobotsType.signals;
    const { active, user_robots } = item || {};

    let statsContent = null;

    if (typeIsSignals) {
        if (active)
            statsContent = (
                <>
                    <StatisticElement label="Active" value={active} />
                    {item.isSubscribed && <StatisticElement label="Subscribed" value={item.subscribed} />}
                </>
            );
    } else {
        const userRobotStatus = !typeIsSignals && user_robots.status;
        const activeAndWithStatus = !typeIsSignals && active && userRobotStatus;
        const statusIsStarted = userRobotStatus === "started";

        if (activeAndWithStatus || statusIsStarted)
            statsContent = (
                <StatisticElement label={capitalize(userRobotStatus)} value={statusIsStarted ? item.started_at : ""} />
            );
    }

    return <div className={styles.statsWrapper}>{statsContent}</div>;
};
