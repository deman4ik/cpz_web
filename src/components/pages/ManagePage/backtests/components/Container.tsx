import React, { FC } from "react";
import styles from "components/pages/ManagePage/backtests/backtests.module.css";

export const Container: FC = ({ children }) => {
    return <div className={styles.container}>{children}</div>;
};
