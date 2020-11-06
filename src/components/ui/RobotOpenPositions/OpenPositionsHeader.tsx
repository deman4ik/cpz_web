import React, { memo } from "react";
import styles from "./OpenPositionsHeader.module.css";

const positionTabHeaders = [
    { title: "Position", flex: 0.3 },
    { title: "Entry", flex: 0.2 },
    { title: "Amount", flex: 0.2 },
    { title: "Unrealized Profit", flex: 0.3 }
];
const defaultFlex = 1;

const _OpenPositionsHeader: React.FC = () => (
    <div className={styles.tableHeader}>
        {positionTabHeaders.map((header) => (
            <div key={header.title} className={styles.wrapper} style={{ flex: header.flex || defaultFlex }}>
                <div className={styles.tableHeaderText}>{header.title}</div>
            </div>
        ))}
    </div>
);

export const OpenPositionsHeader = memo(_OpenPositionsHeader);
