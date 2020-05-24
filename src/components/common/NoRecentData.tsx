import React from "react";
import styles from "./NoRecentData.module.css";

interface Props {
    message: string;
    style?: React.CSSProperties;
}

export const NoRecentData: React.FC<Props> = ({ message, style }) => (
    <div className={styles.container} style={style}>
        {message}
    </div>
);
