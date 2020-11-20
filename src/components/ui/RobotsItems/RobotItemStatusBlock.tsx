import React from "react";

import styles from "./RobotsItem.module.css";

interface Props {
    item: any;
    displayType: string;
}

export const RobotItemStatusBlock: React.FC<Props> = ({ item, displayType }) => {
    const { active } = item || {};
    const activeAndWithStatus = active && item.user_robots.status;
    const statusIsStarted = item.user_robots.status === "started";
    return (
        <>
            {displayType === "signals" && active ? (
                <div className={styles.statisticsElement}>
                    <div className={styles.secondaryText}>Active&nbsp;</div>
                    <div className={styles.statisticsText}>{active}</div>
                </div>
            ) : null}
            {displayType === "robots" && (activeAndWithStatus || statusIsStarted) ? (
                <div className={styles.statisticsElement}>
                    <div className={styles.secondaryText}>{`${statusIsStarted ? "Started" : "Active"}`}&nbsp;</div>
                    <div className={styles.statisticsText}>{statusIsStarted ? item.started_at : active}</div>
                </div>
            ) : null}
            {item.isSubscribed ? (
                <div className={styles.statisticsElement} style={{ marginTop: 8 }}>
                    <div className={styles.secondaryText}>Subscribed&nbsp;</div>
                    <div className={styles.statisticsText}>{item.subscribed}</div>
                </div>
            ) : null}
        </>
    );
};
