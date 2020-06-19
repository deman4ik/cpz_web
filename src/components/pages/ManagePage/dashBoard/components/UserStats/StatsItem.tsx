import React from "react";
// styles
import styles from "../../styles/UserStats.module.css";

export interface StatsInterface {
    title: string;
    count: number;
    plus?: boolean;
}

const StatsItem: React.FC<any> = ({ title, count, plus }) => {
    /*color count*/
    let colorCount = "#ffffff";
    if (!count) {
        colorCount = "var(--negative)";
    }
    if (count && plus) {
        colorCount = "var(--secondary)";
    }
    return (
        <div className={styles.stats_item}>
            <div className={styles.stats_item_title}>{title}</div>
            <div className={styles.stats_item_cnt} style={{ color: colorCount }}>
                {plus && "+"}
                {count}
            </div>
        </div>
    );
};

export default StatsItem;
