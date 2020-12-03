import React from "react";
// styles
import styles from "../../styles/UserStats.module.css";

export interface StatsInterface {
    title: number | string | JSX.Element;
    value: number | string | JSX.Element;
    itemFontSize?: number | string;
}

const titleFontSizeMap = {
    "var(--big2)": "var(--normal2)",
    "var(--big1)": "var(--normal1)",
    "var(--normal3)": "var(--normal0)",
    "var(--normal2)": "var(--small1)",
    "var(--normal1)": "var(--small2)",
    "var(--normal0)": "var(--small3)"
};

const StatsItem: React.FC<any> = ({ title, value, itemFontSize = "var(--big1)" }) => {
    return (
        <div className={styles.stats_item}>
            <div className={styles.stats_item_title} style={{ fontSize: titleFontSizeMap[itemFontSize] }}>
                {title}
            </div>
            <div className={styles.stats_item_cnt} style={{ fontSize: itemFontSize }}>
                {value}
            </div>
        </div>
    );
};

export default StatsItem;
