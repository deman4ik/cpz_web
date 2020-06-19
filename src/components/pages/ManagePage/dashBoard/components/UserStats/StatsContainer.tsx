import React from "react";
// components
import StatsItem from "./StatsItem";
import styles from "components/pages/ManagePage/dashBoard/styles/UserStats.module.css";
// types
import { StatsInterface } from "./StatsItem";

interface StatsProps {
    data: Array<StatsInterface>;
    title: string;
}

const StatsContainer: React.FC<StatsProps> = ({ data, title }) => {
    return (
        <div className={styles.stats_wrapper}>
            <div className={styles.stats_title}>{title}</div>
            <div className={styles.stats_container}>
                {data.map((item, index) => (
                    <StatsItem {...item} key={index} />
                ))}
            </div>
        </div>
    );
};

export default StatsContainer;
