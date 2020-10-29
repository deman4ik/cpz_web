import React from "react";

import { ArrowDownIcon, ArrowUpIcon } from "assets/icons/svg";
import { Button } from "components/basic";
import {
    colorDirection,
    capitalize,
    getIconName,
    getColor,
    colorAction,
    formatMoney,
    valueWithSign
} from "config/utils";
import styles from "./OpenPositionsItemCard.module.css";
import { PropsOpenPositionsItem } from "./types";

const components = {
    arrowdown: ArrowDownIcon,
    arrowup: ArrowUpIcon
};

export const OpenPositionsItemCard: React.FC<PropsOpenPositionsItem> = ({ item, onRedirectToDetailView }) => {
    const SpecificIcon = components[getIconName(item.direction)];
    const handleOnPress = () => {
        onRedirectToDetailView(item.robot.code);
    };

    return (
        <div className={styles.container} key={item.id}>
            <div className={[styles.row, styles.rowCaption].join(" ")} onClick={handleOnPress}>
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
            <div className={[styles.row, styles.rowBody].join(" ")}>
                <div className={styles.sectionGroup} style={{ flex: 0.8 }}>
                    <div className={styles.headerText} style={{ marginBottom: 2 }}>
                        Entry
                    </div>
                    <div className={styles.cellText}>{`${item.entry_price} $`}</div>
                    <div className={styles.secondaryText} style={{ marginTop: 1 }}>
                        {item.entry_date}
                    </div>
                </div>
                <div className={styles.sectionGroup} style={{ flex: 0.8 }}>
                    <div className={styles.headerText} style={{ marginBottom: 2 }}>
                        Unrealized Profit
                    </div>
                    <div className={styles.cellText} style={{ ...colorAction(item.profit > 0) }}>{`${valueWithSign(
                        formatMoney(item.profit)
                    )} $`}</div>
                </div>
                <div className={styles.sectionGroup} style={{ flex: 0.5, alignItems: "flex-end" }}>
                    <div className={styles.headerText}>Amount</div>
                    <div className={styles.iconGroup}>
                        <div style={{ marginTop: 2 }}>
                            <SpecificIcon color={getColor(item.direction === "short")} size={16} />
                        </div>
                        <div className={styles.tableCellText}>{`${item.volume} ${item.asset}`}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
