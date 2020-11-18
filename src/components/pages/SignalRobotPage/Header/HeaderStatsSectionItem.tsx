import React, { FC, ReactText } from "react";
import styles from "components/pages/SignalRobotPage/Header/styles/HeaderStatsSection.module.css";
import { color } from "config/constants";

export interface HeaderStatsSectionItemProps {
    label: string;
    value: string | ReactText;
    valueColor?: string;
}
export const HeaderStatsSectionItem: FC<HeaderStatsSectionItemProps> = ({ label, value, valueColor }) => {
    return (
        <div className={styles.robotStatsRow}>
            <div className={styles.robotStatsLabel}>{label}&nbsp;</div>
            <div className={styles.robotStatsValue} style={{ color: valueColor || color.white }}>
                {value}
            </div>
        </div>
    );
};
