import React, { memo } from "react";
import styles from "./OpenPositionsSubtitle.module.css";

interface Props {
    title: string;
}

const _OpenPositionsTitle: React.FC<Props> = ({ title }) => (
    <div className={styles.left}>
        <div className={styles.leftText}>{title}</div>
    </div>
);

export const OpenPositionsTitle = memo(_OpenPositionsTitle);
