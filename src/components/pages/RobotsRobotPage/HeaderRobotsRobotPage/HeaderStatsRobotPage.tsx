import React, { memo } from "react";

import { moneyFormat, capitalize } from "../../../../config/utils";
import { activeDays, startedAt, getProfit } from "../helpers";
import { color } from "../../../../config/constants";
import styles from "./HeaderStatsRobotPage.module.css";

interface Props {
    robotData: any;
}

const _HeaderStatsRobotPage: React.FC<Props> = ({ robotData }) => {
    const { isUserRobot } = robotData.robot;

    return (
        <div className={styles.robotStats}>
            <div className={styles.robotStatsCol}>
                <div className={styles.robotStatsRow}>
                    <div className={styles.robotStatsLabel}>Profit&nbsp;</div>
                    <div
                        className={styles.robotStatsValue}
                        style={{ color: getProfit(robotData, isUserRobot) > 0 ? color.positive : color.negative }}>
                        {`${moneyFormat(getProfit(robotData, isUserRobot))} $`}
                    </div>
                </div>
                <div className={styles.robotStatsRow}>
                    <div className={styles.robotStatsLabel}>Amount&nbsp;</div>
                    <div className={styles.robotStatsValue}>
                        {isUserRobot ? robotData.user_robots.settings.volume : robotData.robot.volume}{" "}
                        {robotData.robot.asset}
                    </div>
                </div>
            </div>
            <div className={styles.robotStatsCol}>
                {isUserRobot ? (
                    <div className={styles.robotStatsRow}>
                        <div className={styles.robotStatsLabel}>Status&nbsp;</div>
                        <div className={styles.robotStatsValue}>{capitalize(robotData.user_robots.status)}</div>
                    </div>
                ) : null}
                {(!isUserRobot && activeDays(robotData) !== null) ||
                (isUserRobot && robotData.user_robots.status === "started") ? (
                    <div className={styles.robotStatsRow}>
                        <div className={styles.robotStatsLabel}>{isUserRobot ? "Started" : "Active"}&nbsp;</div>
                        <div className={styles.robotStatsValue}>
                            {isUserRobot ? startedAt(robotData) : activeDays(robotData)}
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export const HeaderStatsRobotPage = memo(_HeaderStatsRobotPage);
