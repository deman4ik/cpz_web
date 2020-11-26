import styles from "components/ui/Modals/index.module.css";
import React, { FC } from "react";

export const Delimiter: FC<{ first?: boolean }> = ({ first }) => {
    return (
        <span className={styles.delimiter} style={{ marginTop: first ? 0 : 10 }}>
            ≈
        </span>
    );
};
