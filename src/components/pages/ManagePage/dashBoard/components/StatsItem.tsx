import React from "react";
// styles
import styles from "../styles/Dasboard.module.css";

const StatsItem: React.FC<any> = ({ title, count, plus }) => {
    return (
        <div className={styles.stats_item}>
            <div className={styles.stats_item_title}>{title}</div>
            <div className={styles.stats_item_cnt}>
                {plus && "+"}
                {count}
            </div>
        </div>
    );
};

export default StatsItem;
