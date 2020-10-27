import React from "react";

import { renderAction, renderVolume } from ".";

import { formatDate, valueWithSign, colorAction, capitalize, formatMoney, splitCapitaize } from "config/utils";
import { SectionType } from "../../types";

import styles from "./styles/RobotPositionCard.module.css";
import { color } from "config/constants";

interface Props {
    item: any;
    robot: any;
    activeTab: SectionType;
}

export const RobotPositionCard: React.FC<Props> = ({ item, robot, activeTab }) => {
    const { asset } = robot;
    const { profit } = item;
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
                {activeTab !== SectionType.signals && (
                    <div
                        className={styles.posCardCol}
                        style={{ flex: activeTab === SectionType.openPositions ? 0.6 : 1 }}>
                        <div className={styles.mobileCardTextKey}>Amount</div>
                        {renderVolume(activeTab, item, asset)}
                    </div>
                )}
                {activeTab === SectionType.signals && (
                    <div className={styles.posCardCol} style={{ flex: 0.6 }}>
                        <div className={styles.mobileCardTextKey}>Action</div>
                        {renderAction(item.action)}
                        {renderVolume(activeTab, item, asset)}
                    </div>
                )}
            </div>
            <div className={styles.rowCard} style={{ justifyContent: "space-between" }}>
                <div className={styles.mobileCardRow} style={{ flex: 1 }}>
                    <div className={styles.mobileCardTextKey}>
                        {activeTab === SectionType.signals ? "Price" : "Entry"}
                    </div>
                    <div className={styles.mobileCardPrice}>{formatMoney(item.entry_price || item.price)} $</div>
                    <div className={styles.mobileCardDate}>{formatDate(item.entry_date || item?.timestamp)}</div>
                </div>

                {activeTab === SectionType.openPositions && (
                    <div className={styles.posCardCol} style={{ flex: 0.6 }}>
                        <div className={styles.mobileCardTextKey}>Unrealized Profit</div>
                        <div
                            className={styles.mobileCardPrice}
                            style={{ color: item.profit > 0 ? color.positive : color.negative }}>
                            {formatMoney(profit)} $
                        </div>
                    </div>
                )}
                {activeTab === SectionType.signals && (
                    <div className={styles.posCardCol} style={{ flex: 0.6 }}>
                        <div className={styles.mobileCardTextKey}>Order Type</div>
                        <div className={styles.mobileCardTextValue}>{capitalize(item.orderType)}</div>
                    </div>
                )}
                {activeTab === SectionType.closedPositions && (
                    <div className={styles.mobileCardRow}>
                        <div className={styles.mobileCardTextKey}>Exit</div>
                        <div className={styles.mobileCardPrice}>{formatMoney(item.exit_price)} $</div>
                        <div className={styles.mobileCardDate}>{formatDate(item.exit_date || item?.timestamp)}</div>
                    </div>
                )}
            </div>
            {activeTab === SectionType.closedPositions && (
                <div className={styles.posCardFooter}>
                    <div className={styles.posCardCol}>
                        <div className={styles.mobileCardTextKey}>
                            Bars Held&nbsp;&nbsp;
                            <span className={styles.mobileCardTextValue}>{item.bars_held}</span>
                        </div>
                    </div>
                    <div className={styles.posCardCol}>
                        <div className={styles.mobileCardTextKey}>
                            Profit&nbsp;&nbsp;
                            <span className={styles.mobileCardTextValue} style={colorAction(item.profit > 0)}>
                                {valueWithSign(formatMoney(item.profit))} $
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
