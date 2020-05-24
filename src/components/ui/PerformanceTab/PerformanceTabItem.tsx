import React from "react";
import styles from "./PerformanceTabItem.module.css";

interface Props {
    item: any;
}

export const PerformanceTabItem: React.FC<Props> = ({ item }) => (
    <div className={styles.tableRow}>
        <div className={styles.col}>
            <div className={styles.mobileCardTextKey}>{item.title}</div>
        </div>
        <div className={styles.col}>
            <div className={styles.tableCellText}>{item.all}</div>
        </div>
        <div className={styles.col}>
            <div className={styles.tableCellText}>{item.long}</div>
        </div>
        <div className={styles.col}>
            <div className={styles.tableCellText}>{item.short}</div>
        </div>
    </div>
);
