import React, { memo } from "react";
import styles from "./ErrorLine.module.css";

interface Props {
    formError: string;
    style?: React.CSSProperties;
}

const _ErrorLine: React.FC<Props> = ({ formError, style }) => (
    <>
        {formError ? (
            <div className={styles.errorContainer} style={style}>
                <div className={styles.errorText}>{formError}</div>
            </div>
        ) : null}
    </>
);

export const ErrorLine = memo(_ErrorLine);
