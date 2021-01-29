import React from "react";
import Link from "next/link";

import { ArrowDownIcon, ArrowUpIcon } from "assets/icons/svg";
import { Button } from "components/basic";
import {
    colorDirection,
    capitalize,
    getIconName,
    getColor,
    formatMoney,
    valueWithSign,
    getTimeFromNow,
    formatDate,
    getColorForMoney
} from "config/utils";
import styles from "./OpenPositionsItemCard.module.css";
import { PropsOpenPositionsItem } from "./types";

const components = {
    arrowdown: ArrowDownIcon,
    arrowup: ArrowUpIcon
};

export const OpenPositionsItemCard: React.FC<PropsOpenPositionsItem> = ({ item, type }) => {
    const SpecificIcon = components[getIconName(item.direction)];

    return (
        <div className={styles.container} key={item.id}>
            <Link href={`/${type}/robot/${item.robot.code}`}>
                <a>
                    <div className={[styles.row, styles.cardCaption].join(" ")}>
                        <div className={styles.sectionGroup} style={{ flex: 0.9 }}>
                            <div className={styles.actionGroup}>
                                <div className={styles.tableCellText} style={colorDirection(item.direction)}>
                                    {capitalize(item.direction)}
                                </div>
                                <div className={styles.tableCellText} style={{ marginLeft: 4 }}>
                                    {item.code}
                                </div>
                            </div>
                            <div className={styles.secondaryText} style={{ marginTop: 2 }}>
                                {item.robot.name}
                            </div>
                        </div>
                        <div className={styles.sectionGroup} style={{ alignItems: "flex-end" }}>
                            <Button
                                title="details"
                                isUppercase
                                size="small"
                                style={{ paddingLeft: 0, paddingRight: 0 }}
                                icon="chevronright"
                            />
                        </div>
                    </div>
                </a>
            </Link>
            <div className={[styles.row, styles.cardBody].join(" ")}>
                <div className={styles.sectionGroup}>
                    <div className={styles.headerText} style={{ marginBottom: 2 }}>
                        Entry
                    </div>
                    <div className={styles.cellText}>{`${item.entry_price} $`}</div>
                    <div className={styles.secondaryText} style={{ marginTop: 1 }} title={formatDate(item.entry_date)}>
                        {getTimeFromNow(item.entry_date)}
                    </div>
                </div>
                <div className={styles.sectionGroup}>
                    <div className={styles.rowFlexEnd}>
                        <span className={styles.headerText}>Amount</span>
                        <span className={styles.iconGroup}>
                            <div style={{ marginTop: 2 }}>
                                <SpecificIcon color={getColor(item.direction === "short")} size={16} />
                            </div>
                            <div className={styles.tableCellText}>{`${item.volume} ${item.robot.asset}`}</div>
                        </span>
                    </div>
                    <div className={styles.rowFlexEnd} style={{ marginTop: 5 }}>
                        <span className={styles.headerText} style={{ marginBottom: 2 }}>
                            Unrealized Profit
                        </span>
                        <span
                            className={styles.cellText}
                            style={{ color: getColorForMoney(item.profit) }}>{`${valueWithSign(
                            formatMoney(item.profit)
                        )} $`}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
