import React, { memo } from "react";

import styles from "./PerformanceHeader.module.css";

const _PerformanceHeader: React.FC = () => (
    <div className={styles.headerContainer}>
        <div className={styles.title} style={{ flex: 20 }}>
            Name
        </div>
        <div className={styles.title} style={{ flex: 25 }}>
            Performance
        </div>
        <div className={styles.title} style={{ flex: 15 }}>
            Profit
        </div>
        <div className={styles.title} style={{ flex: 15 }}>
            Win Rate
        </div>
        <div className={styles.title} style={{ flex: 15 }}>
            Max Drawdown
        </div>
        <div className={styles.title} style={{ flex: 10 }}>
            Trades Count
        </div>
    </div>
);

export const PerformanceHeader = memo(_PerformanceHeader);
