import React from "react";

import { Robot, SectionType } from "../../types";
import {
    formatDate,
    valueWithSign,
    formatMoney,
    splitCapitaize,
    getTimeFromNow,
    getColorForMoney,
    colorAction
} from "config/utils";
import { VolumePositionRobotPageItem } from ".";
import styles from "./styles/RobotPositionCard.module.css";

interface Props {
    item: any;
    robot: Robot;
    activeTab: SectionType;
}

export const RobotPositionCard: React.FC<Props> = ({ item, robot, activeTab }) => {
    const { asset, isOwnedByUser } = robot;
    return (
        <div className={styles.posCard}>
            <div className={styles.rowCard}>
                <div className={styles.posCardCol} style={{ flex: 1 }}>
                    <div className={styles.mobileCardTextKey}>Position</div>
                    <div className={styles.mobileCardTextValue}>
                        <div style={colorAction(["long", "closeShort"].includes(item.direction || item.action))}>
                            {splitCapitaize(item.direction || item.action)}
                        </div>
                        {"\n"}
                        <div className={styles.mobileCardTextKey}>{item.code}</div>
                    </div>
                </div>
                <div className={styles.posCardCol} style={{ flex: 0.6 }}>
                    <div className={styles.mobileCardTextKey}>Amount</div>
                    <VolumePositionRobotPageItem
                        activeTab={activeTab}
                        direction={item.direction}
                        volume={
                            activeTab === SectionType.openPositions && isOwnedByUser ? item.entry_executed : item.volume
                        }
                        asset={asset}
                    />
                </div>
            </div>
            <div className={styles.rowCard} style={{ justifyContent: "space-between" }}>
                <div className={styles.mobileCardRow} style={{ flex: 1 }}>
                    <div className={styles.mobileCardTextKey}>Entry</div>
                    <div className={styles.mobileCardPrice}>{formatMoney(item.entry_price || item.price)} $</div>
                    <div className={styles.mobileCardDate} title={formatDate(item.entry_date)}>
                        {getTimeFromNow(item.entry_date)}
                    </div>
                </div>
                {activeTab === SectionType.closedPositions && (
                    <div className={styles.mobileCardRow}>
                        <div className={styles.mobileCardTextKey}>Exit</div>
                        <div className={styles.mobileCardPrice}>{formatMoney(item.exit_price)} $</div>
                        <div className={styles.mobileCardDate} title={formatDate(item.exit_date)}>
                            {getTimeFromNow(item.exit_date)}
                        </div>
                    </div>
                )}
                <div className={styles.mobileCardRow} style={{ flex: 1, alignItems: "flex-end" }}>
                    <div className={styles.mobileCardTextKey}>Unrealized Profit</div>
                    <div className={styles.mobileCardPrice} style={{ color: getColorForMoney(item.profit) }}>
                        {valueWithSign(formatMoney(item.profit))} $
                    </div>
                </div>
            </div>
            {activeTab === SectionType.closedPositions && (
                <div className={styles.posCardFooter}>
                    <div className={styles.posCardCol}>
                        <div className={styles.mobileCardTextKey}>
                            Bars Held&nbsp;&nbsp;
                            <div className={styles.mobileCardTextValue}>{item.bars_held}</div>
                        </div>
                    </div>
                    <div className={styles.posCardCol}>
                        <div className={styles.mobileCardTextKey}>
                            Profit&nbsp;&nbsp;
                            <span
                                className={styles.mobileCardTextValue}
                                style={{ color: getColorForMoney(item.profit) }}>
                                {valueWithSign(formatMoney(item.profit))} $
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
