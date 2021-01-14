import React from "react";
// components
import StatsItem, { StatsInterface } from "./StatsItem";
import styles from "components/pages/ManagePage/dashBoard/styles/UserStats.module.css";
// types

interface StatsProps {
    data: Array<StatsInterface>;
    title?: string | JSX.Element;
    titleFontSize?: number | string;
    itemFontSize?: number | string;
}

const StatsContainer: React.FC<StatsProps> = ({
    data,
    title,
    titleFontSize = "var(--normal3)",
    itemFontSize = "var(--big1)"
}) => {
    return (
        <div className={styles.wrapper}>
            {title && (
                <div className={styles.stats_title} style={{ fontSize: titleFontSize }}>
                    {title}
                </div>
            )}
            <div className={styles.stats_container} style={{ marginTop: title ? 15 : 0 }}>
                {data.map((item, index) => (
                    <StatsItem {...item} key={index} itemFontSize={itemFontSize} />
                ))}
            </div>
        </div>
    );
};

export default StatsContainer;
