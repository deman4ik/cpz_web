import styles from "components/ui/Modals/index.module.css";
import React, { FC } from "react";

export const Delimiter: FC<{ first?: boolean }> = () => {
    return <span className={styles.delimiter}>≈</span>;
};
