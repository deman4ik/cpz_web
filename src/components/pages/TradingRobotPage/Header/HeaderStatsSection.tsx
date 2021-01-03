import React, { memo } from "react";

import { formatMoney, capitalize } from "config/utils";
import { activeDays, startedAt, getProfit } from "../helpers";
import { color } from "config/constants";
import styles from "./styles/StatsSection.module.css";
import { HeaderStatsSectionItem } from "components/pages/TradingRobotPage/Header/HeaderStatsSectionItem";

interface Props {
    robotData: any;
}

// TODO: check whether the robot is owned by user elsewhere
// the data for public and user robots must be of equal structure
const _HeaderStatsSection: React.FC<Props> = ({ robotData }) => {
    const { robot, userRobot } = robotData;
    const { isOwnedByUser } = robot;
    const displayData = isOwnedByUser ? userRobot : robot;

    const notOwnedButHasActiveDays = !isOwnedByUser && activeDays(robotData) !== null;
    const ownedAndStarted = isOwnedByUser && userRobot.status === "started";
    return (
        <div className={styles.robotStats}>
            <div className={styles.robotStatsCol}>
                <HeaderStatsSectionItem
                    value={`${formatMoney(getProfit(robotData))} $`}
                    label="Profit"
                    customStyles={{ value: { color: getProfit(robotData) > 0 ? color.positive : color.negative } }}
                />

                {isOwnedByUser && <HeaderStatsSectionItem label="Status" value={capitalize(userRobot.status)} />}

                {notOwnedButHasActiveDays ||
                    (ownedAndStarted && (
                        <HeaderStatsSectionItem
                            label={isOwnedByUser ? "Started" : "Active"}
                            value={isOwnedByUser ? startedAt(robotData) : activeDays(robotData)}
                        />
                    ))}
            </div>

            <div className={styles.robotStatsCol}>
                <HeaderStatsSectionItem label="Amount" value={displayData.displayedVolume} />
                {isOwnedByUser && <HeaderStatsSectionItem label="Amount Type" value={userRobot.volumeType} />}
            </div>
        </div>
    );
};

export const HeaderStatsSection = memo(_HeaderStatsSection);
