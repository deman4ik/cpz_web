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

    let statsContent = <span style={{ color: "white" }}>&#8211;</span>;

    if (typeIsSignals) {
        if (active)
            statsContent = (
                <>
                    <StatisticElement label="Active" value={active} />
                    {item.isSubscribed && <StatisticElement label="Subscribed" value={item.subscribed} />}
                </>
            );
    } else {
        const userRobotStatus = user_robots.status;
        const statusIsStarted = userRobotStatus === "started";

        const statusLabel = userRobotStatus || "Active";
        const displayedTime = userRobotStatus ? item.started_at : item.active;

        if (active || statusIsStarted)
            statsContent = <StatisticElement label={capitalize(statusLabel)} value={displayedTime} />;
    }

    return <div className={styles.statsWrapper}>{statsContent}</div>;
};
