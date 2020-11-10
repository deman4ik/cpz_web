import React, { memo } from "react";

import styles from "./PerformanceHeader.module.css";

type Props = {
    compact?: boolean;
};

const _PerformanceHeader = ({ compact }: Props): JSX.Element => (
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
        {compact ? (
            <div className={styles.title} style={{ flex: 15 }}>
                Statistics
            </div>
        ) : (
            <>
                <div className={styles.title} style={{ flex: 15 }}>
                    Win Rate
                </div>
                <div className={styles.title} style={{ flex: 15 }}>
                    Max Drawdown
                </div>
                <div className={styles.title} style={{ flex: 10 }}>
                    Trades Count
                </div>
            </>
        )}
    </div>
);

_PerformanceHeader.defaultProps = { compact: false };

export const PerformanceHeader = memo(_PerformanceHeader);
