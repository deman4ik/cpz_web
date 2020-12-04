import React, { memo } from "react";
import styles from "./RobotsHeader.module.css";

const _RobotsHeader: React.FC = () => (
    <div className={styles.container}>
        <div className={styles.title} style={{ minWidth: 220, flex: 25 }}>
            Robot Name
        </div>
        <div className={styles.title} style={{ flex: 25 }}>
            Performance
        </div>
        <div className={styles.title} style={{ flex: 8 }}>
            Profit
        </div>
        <div className={styles.title} style={{ flex: 17 }}>
            Statistics
        </div>
        <div className={styles.title} style={{ flex: 13 }}>
            Status
        </div>
        <div className={styles.title} style={{ flex: 12 }}>
            Action
        </div>
    </div>
);

export const RobotsHeader = memo(_RobotsHeader);
