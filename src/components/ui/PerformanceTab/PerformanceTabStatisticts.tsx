import React, { memo } from "react";

import { tableHeaders } from "./helpers";
import styles from "./PerformanceTabStatisticts.module.css";

const _PerformanceTabStatisticts = () => (
    <div className={styles.tableHeader}>
        {tableHeaders.map((title) => (
            <div key={title} className={styles.wrapper}>
                <div className={styles.tableHeaderText}>{title}</div>
            </div>
        ))}
    </div>
);

export const PerformanceTabStatisticts = memo(_PerformanceTabStatisticts);
