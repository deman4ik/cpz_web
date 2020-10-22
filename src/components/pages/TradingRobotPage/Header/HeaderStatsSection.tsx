import React, { memo } from "react";

import { formatMoney, capitalize } from "config/utils";
import { activeDays, startedAt, getProfit } from "../helpers";
import { color } from "config/constants";
import styles from "./styles/StatsSection.module.css";

interface Props {
    robotData: any;
}

// TODO: check whether the robot is owned by user elsewhere
// the data for public and user robots must be of equal structure
const _HeaderStatsSection: React.FC<Props> = ({ robotData }) => {
    const { robot, userRobot } = robotData;
    const { isOwnedByUser } = robot;
    return (
        <div className={styles.robotStats}>
            <div className={styles.robotStatsCol}>
                <div className={styles.robotStatsRow}>
                    <div className={styles.robotStatsLabel}>Profit&nbsp;</div>
                    <div
                        className={styles.robotStatsValue}
                        style={{ color: getProfit(robotData) > 0 ? color.positive : color.negative }}>
                        {`${formatMoney(getProfit(robotData))} $`}
                    </div>
                </div>
                <div className={styles.robotStatsRow}>
                    <div className={styles.robotStatsLabel}>Amount&nbsp;</div>
                    <div className={styles.robotStatsValue}>
                        {isOwnedByUser ? userRobot.displayedVolume : robot.displayedVolume}
                    </div>
                </div>
            </div>
            <div className={styles.robotStatsCol}>
                {isOwnedByUser ? (
                    <div className={styles.robotStatsRow}>
                        <div className={styles.robotStatsLabel}>Status&nbsp;</div>
                        <div className={styles.robotStatsValue}>{capitalize(userRobot.status)}</div>
                    </div>
                ) : null}
                {(!isOwnedByUser && activeDays(robotData) !== null) ||
                (isOwnedByUser && userRobot.status === "started") ? (
                    <div className={styles.robotStatsRow}>
                        <div className={styles.robotStatsLabel}>{isOwnedByUser ? "Started" : "Active"}&nbsp;</div>
                        <div className={styles.robotStatsValue}>
                            {isOwnedByUser ? startedAt(robotData) : activeDays(robotData)}
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export const HeaderStatsSection = memo(_HeaderStatsSection);
