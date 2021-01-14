import React, { FC } from "react";
import { LoadingIndicator } from "components/common";
import styles from "./index.module.css";

export const ModalLoading: FC = () => {
    return (
        <div className={styles.loading}>
            <LoadingIndicator />
        </div>
    );
};
