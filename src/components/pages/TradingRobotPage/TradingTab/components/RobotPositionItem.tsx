import React from "react";

import {
    formatDate,
    capitalize,
    valueWithSign,
    colorDirection,
    formatMoney,
    getTimeFromNow,
    getColorForMoney
} from "config/utils";
import { Robot } from "components/pages/TradingRobotPage/types";
import styles from "./styles/RobotPositionItem.module.css";

interface Props {
    item: any;
    robot: Robot;
}

export const RobotPositionItem: React.FC<Props> = ({ item, robot }) => {
    const { asset } = robot;
    return (
        <div className={styles.tableRow}>
            <div className={styles.col} style={{ flex: 0.5 }}>
                <div className={styles.tableCellText}>
                    <div style={colorDirection(item.direction)}>{capitalize(item.direction)}</div>
                    {"\n"}
                    <div className={styles.title}>{item.code}</div>
                </div>
            </div>
            <div className={styles.col} style={{ flex: 0.5, justifyContent: "center" }}>
                <div className={styles.tableCellText}>
                    {item.volume} {asset}
                </div>
            </div>
            <div className={styles.col} style={{ flex: 1 }}>
                <div className={styles.tableCellText}>
                    {formatMoney(item.entry_price)} ${"\n"}
                    <div className={styles.title} title={formatDate(item.enry_date)}>
                        {getTimeFromNow(item.entry_date)}
                    </div>
                </div>
            </div>
            <div className={styles.col} style={{ flex: 1 }}>
                <div className={styles.tableCellText}>
                    {formatMoney(item.exit_price)} ${"\n"}
                    <div className={styles.title} title={formatDate(item.exit_date)}>
                        {getTimeFromNow(item.exit_date)}
                    </div>
                </div>
            </div>
            <div className={styles.col} style={{ flex: 0.5, justifyContent: "center" }}>
                <div className={styles.tableCellText}>{item.bars_held}</div>
            </div>
            <div className={styles.col} style={{ flex: 0.5, justifyContent: "center" }}>
                <div className={styles.tableCellText} style={{ color: getColorForMoney(item.profit) }}>
                    {valueWithSign(formatMoney(item.profit))} $
                </div>
            </div>
        </div>
    );
};
