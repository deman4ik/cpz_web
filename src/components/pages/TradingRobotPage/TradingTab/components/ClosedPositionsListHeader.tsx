import React, { memo } from "react";
import styles from "./styles/HeaderTradingTabRobotPage.module.css";

const positionsTabHeaders = [
    { title: "Position", flex: 0.5 },
    { title: "Amount", flex: 0.5 },
    { title: "Entry", flex: 1 },
    { title: "Exit", flex: 1 },
    { title: "Bars Held", flex: 0.5 },
    { title: "Profit", flex: 0.5 }
];
const defaultFlex = 0.1;
const _ClosedPositionsListHeader: React.FC = () => (
    <div className={styles.tableHeader}>
        {positionsTabHeaders.map((header) => (
            <div key={header.title} style={{ flex: header.flex || defaultFlex }}>
                <div className={styles.tableHeaderText}>{header.title}</div>
            </div>
        ))}
    </div>
);

export const ClosedPositionsListHeader = memo(_ClosedPositionsListHeader);
