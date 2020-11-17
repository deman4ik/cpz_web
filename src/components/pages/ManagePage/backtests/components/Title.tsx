import React, { FC } from "react";
import styles from "../backtests.module.css";

export const Title: FC<{ title: string }> = ({ title }) => {
    return <div className={styles.title}>{title}</div>;
};
