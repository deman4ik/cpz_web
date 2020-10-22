import React, { memo } from "react";

import { formatMoney } from "config/utils";
import { getSubscriptionDuration, activeDays, getProfit, getDisplayedVolume } from "../helpers";
import { color } from "config/constants";
import styles from "./styles/HeaderStatsSection.module.css";

interface Props {
    robotData: any;
}

const _HeaderStatsSection: React.FC<Props> = ({ robotData }) => {
    const { isUserSubscribed } = robotData.robot;
    const profit = getProfit(robotData);

    return (
        <div className={styles.robotStats}>
            <div className={styles.robotStatsCol}>
                <div className={styles.robotStatsRow}>
                    <div className={styles.robotStatsLabel}>Profit&nbsp;</div>
                    <div
                        className={styles.robotStatsValue}
                        style={{ color: profit > 0 ? color.positive : color.negative }}>
                        {`${formatMoney(profit)} $`}
                    </div>
                </div>
                <div className={styles.robotStatsRow}>
                    <div className={styles.robotStatsLabel}>Amount&nbsp;</div>
                    <div className={styles.robotStatsValue}>{getDisplayedVolume(robotData)}</div>
                </div>
            </div>
            <div className={styles.robotStatsCol}>
                <div className={styles.robotStatsRow}>
                    <div className={styles.robotStatsLabel}>Active&nbsp;</div>
                    <div className={styles.robotStatsValue}>{activeDays(robotData)}</div>
                </div>
                {isUserSubscribed && (
                    <div className={styles.robotStatsRow}>
                        <div className={styles.robotStatsLabel}>Subscribed&nbsp;</div>
                        <div className={styles.robotStatsValue}>{getSubscriptionDuration(robotData)}</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export const HeaderStatsSection = memo(_HeaderStatsSection);
