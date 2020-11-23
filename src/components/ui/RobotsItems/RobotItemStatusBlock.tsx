import React from "react";

import styles from "./RobotsItem.module.css";
import { StatisticElement } from "components/ui/RobotsItems/StatisticsElement";

interface Props {
    item: any;
    displayType: string;
}

export const RobotItemStatusBlock: React.FC<Props> = ({ item, displayType }) => {
    const { active, user_robots } = item || {};
    const activeAndWithStatus = active && user_robots.status;
    const statusIsStarted = user_robots.status === "started";
    return (
        <div className={styles.statsWrapper}>
            {displayType === "signals" && active ? <StatisticElement label="Active" value={active} /> : null}
            {displayType === "robots" && (activeAndWithStatus || statusIsStarted) ? (
                <StatisticElement
                    label={`${statusIsStarted ? "Started" : "Active"}`}
                    value={statusIsStarted ? item.started_at : active}
                />
            ) : null}
            {item.isSubscribed ? <StatisticElement label="Subscribed" value={item.subscribed} /> : null}
        </div>
    );
};
