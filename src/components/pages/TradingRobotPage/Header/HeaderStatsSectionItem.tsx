import React, { FC } from "react";
import styles from "components/pages/TradingRobotPage/Header/styles/StatsSection.module.css";

interface HeaderStatsSectionItemProps {
    value: string;
    label: string;
    customStyles?: any;
}
export const HeaderStatsSectionItem: FC<HeaderStatsSectionItemProps> = ({ value, label, customStyles = {} }) => {
    return (
        <div className={styles.robotStatsRow} style={customStyles.container}>
            <div className={styles.robotStatsLabel} style={customStyles.label}>
                {label}&nbsp;
            </div>
            <div className={styles.robotStatsValue} style={customStyles.value}>
                {value}
            </div>
        </div>
    );
};
