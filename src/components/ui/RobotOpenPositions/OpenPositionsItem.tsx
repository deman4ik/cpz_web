import React from "react";
import Link from "next/link";

import { ChevronRightIcon, ArrowDownIcon, ArrowUpIcon } from "assets/icons/svg";
import {
    capitalize,
    getColor,
    getIconName,
    colorDirection,
    formatMoney,
    valueWithSign,
    getTimeFromNow,
    formatDate,
    getColorForMoney
} from "config/utils";
import { color } from "config/constants";
import { PropsOpenPositionsItem } from "./types";
import styles from "./OpenPositionsItem.module.css";
import tableStyles from "./OpenPositionsTable.module.css";

const components = {
    arrowdown: ArrowDownIcon,
    arrowup: ArrowUpIcon
};

export const OpenPositionsItem: React.FC<PropsOpenPositionsItem> = ({ item, type }) => {
    const SpecificIcon = components[getIconName(item.direction)];

    return (
        <div className={`${styles.tableRow} ${tableStyles.tableGridRow}`}>
            <Link href={`/${type}/robot/${item.robot.code}`}>
                <a>
                    <div
                        className={styles.positionGroup}
                        style={{
                            flex: 0.3
                        }}>
                        <div className={styles.limitWrapper}>
                            <div className={styles.codeGroup}>
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
                        <ChevronRightIcon color={color.white} size={26} />
                    </div>
                </a>
            </Link>
            <div className={styles.col}>
                <div className={styles.tableCellText}>{`${item.entry_price} $`}</div>
                <div className={styles.secondaryText} style={{ marginTop: 2 }} title={formatDate(item.entry_date)}>
                    {getTimeFromNow(item.entry_date)}
                </div>
            </div>
            <div className={styles.volumeGroup}>
                <div style={{ marginTop: 2 }}>
                    <SpecificIcon color={getColor(item.direction === "short")} size={16} />
                </div>
                <div className={styles.tableCellText}>{`${item.volume} ${item.robot.asset}`}</div>
            </div>
            <div className={styles.col}>
                <div
                    className={styles.tableCellText}
                    style={{ color: getColorForMoney(item.profit) }}>{`${valueWithSign(
                    formatMoney(item.profit)
                )} $`}</div>
            </div>
        </div>
    );
};
