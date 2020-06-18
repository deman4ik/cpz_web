import React from "react";
// components
import StatsItem from "./components/StatsItem";
//styles
import styles from "./styles/Dasboard.module.css";

const TotalStats: React.FC<any> = () => {
    return (
        <div className={styles.stats_wrapper}>
            <div className={styles.stats_title}>Total statistics</div>
            <div className={styles.stats_container}>
                <StatsItem title="Total" count={32} plus={false} />
                <StatsItem title="With Signals" count={20} plus={false} />
                <StatsItem title="With Robots" count={15} plus={false} />
            </div>
            <div className={styles.stats_title}>Timestamp statistics</div>
            <div className={styles.stats_container}>
                <StatsItem title="Today" count={32} plus />
                <StatsItem title="Yesterday" count={20} plus />
                <StatsItem title="Week" count={0} plus={false} />
                <StatsItem title="Month" count={15} plus />
            </div>
        </div>
    );
};

export default TotalStats;
