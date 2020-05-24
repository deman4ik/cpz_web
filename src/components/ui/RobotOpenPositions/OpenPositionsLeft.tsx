import React, { memo } from "react";
import styles from "./OpenPositionsTitle.module.css";

interface Props {
    title: string;
}

const _OpenPositionsLeft: React.FC<Props> = ({ title }) => (
    <div className={styles.left}>
        <div className={styles.leftText}>{title}</div>
    </div>
);

export const OpenPositionsLeft = memo(_OpenPositionsLeft);
