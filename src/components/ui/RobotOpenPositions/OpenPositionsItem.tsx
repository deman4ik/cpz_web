import React from "react";

import { ChevronRightIcon, ArrowDownIcon, ArrowUpIcon } from "assets/icons/svg";
import {
    capitalize,
    getColor,
    getIconName,
    colorDirection,
    formatMoney,
    colorAction,
    valueWithSign
} from "config/utils";
import { color } from "config/constants";
import { PropsOpenPositionsItem } from "./types";
import styles from "./OpenPositionsItem.module.css";

const components = {
    arrowdown: ArrowDownIcon,
    arrowup: ArrowUpIcon
};

export const OpenPositionsItem: React.FC<PropsOpenPositionsItem> = ({ item, onRedirectToDetailView }) => {
    const SpecificIcon = components[getIconName(item.direction)];

    const handleOnPress = () => {
        onRedirectToDetailView(item.robot.code);
    };

    return (
        <div className={styles.tableRow}>
            <div className={styles.positionGroup} onClick={handleOnPress}>
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
            <div className={styles.volumeGroup}>
                <div style={{ marginTop: 2 }}>
                    <SpecificIcon color={getColor(item.direction === "short")} size={16} />
                </div>
                <div className={styles.tableCellText}>{`${item.volume} ${item.robot.asset}`}</div>
            </div>
            <div className={styles.col} style={{ flex: 0.3 }}>
                <div className={styles.tableCellText}>{`${item.entry_price} $`}</div>
                <div className={styles.secondaryText} style={{ marginTop: 2 }}>
                    {item.entry_date}
                </div>
            </div>
            <div className={styles.col} style={{ flex: 0.2 }}>
                <div className={styles.tableCellText} style={{ ...colorAction(item.profit > 0) }}>{`${valueWithSign(
                    formatMoney(item.profit)
                )} $`}</div>
            </div>
        </div>
    );
};
