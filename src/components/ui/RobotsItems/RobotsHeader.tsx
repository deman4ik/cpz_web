import React, { memo } from "react";
import styles from "./RobotsHeader.module.css";

const _RobotsHeader: React.FC = () => (
    <div className={styles.container}>
        <div className={styles.title} style={{ flex: 4 }}>
            Robot Name
        </div>
        <div className={styles.title} style={{ flex: 4.2 }}>
            Performance
        </div>
        <div className={styles.title} style={{ flex: 2 }}>
            Profit
        </div>
        <div className={styles.title} style={{ flex: 2.8 }}>
            Statistics
        </div>
        <div className={styles.title} style={{ flex: 2.2 }}>
            Status
        </div>
        <div className={styles.title} style={{ flex: 2 }}>
            Action
        </div>
    </div>
);

export const RobotsHeader = memo(_RobotsHeader);
