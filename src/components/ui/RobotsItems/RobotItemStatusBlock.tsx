import React from "react";

import styles from "./RobotsItem.module.css";
import { StatisticElement } from "components/ui/RobotsItems/StatisticsElement";
import { capitalize } from "lodash";
import { RobotsType } from "config/types";

interface Props {
    item: any;
    displayType: string;
}

const statusMap = {
    stopped: "stopped_at",
    started: "started_at"
};

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
        const statusLabel = userRobotStatus || (active && "Active");

        let displayedTime = item.active;

        if (userRobotStatus) {
            if (statusMap[userRobotStatus]) displayedTime = item[statusMap[userRobotStatus]];
            else displayedTime = null;
        }

        if (statusLabel || displayedTime)
            statsContent = <StatisticElement label={capitalize(statusLabel)} value={displayedTime} />;
    }

    return <div className={styles.statsWrapper}>{statsContent}</div>;
};
