import React, { memo } from "react";

import styles from "./PerformanceHeader.module.css";

const _PerformanceHeader: React.FC = () => (
    <div className={styles.headerContainer}>
        <div className={styles.title} style={{ flex: 0.2 }}>
            Name
        </div>
        <div className={styles.title} style={{ flex: 0.45 }}>
            Performance
        </div>
        <div className={styles.title} style={{ flex: 0.15 }}>
            Profit
        </div>
        <div className={styles.title} style={{ flex: 0.2 }}>
            Statistics
        </div>
    </div>
);

export const PerformanceHeader = memo(_PerformanceHeader);
