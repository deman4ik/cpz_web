import styles from "components/ui/Modals/index.module.css";
import React, { FC } from "react";

export const Delimiter: FC = () => {
    return (
        <span className={styles.delimiter} style={{ marginTop: 10 }}>
            ≈
        </span>
    );
};
