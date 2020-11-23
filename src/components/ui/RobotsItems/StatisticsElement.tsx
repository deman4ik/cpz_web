import React, { FC } from "react";
import styles from "components/ui/RobotsItems/RobotsItem.module.css";

interface StatisticElementProps {
    label: string;
    value: string | number;
    valueTextStyle?: any;
    className?: string;
}
export const StatisticElement: FC<StatisticElementProps> = ({ label, value, valueTextStyle, className }) => {
    return (
        <div className={`${styles.statisticsElement} ${className || ""}`}>
            <div className={styles.secondaryText}>{label}&nbsp;</div>
            <div className={styles.statisticsText} style={valueTextStyle}>
                {value}
            </div>
        </div>
    );
};
