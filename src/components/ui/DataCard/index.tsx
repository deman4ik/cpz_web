import React from "react";

import styles from "./index.module.css";

interface Props {
    header?: string | JSX.Element;
    body?: string | JSX.Element;
    footer?: string | JSX.Element;
}

export const DataCard: React.FC<Props> = ({ header, body, footer }) => {
    return (
        <div className={styles.container}>
            {header && <div className={styles.header}>{header}</div>}
            <div className={styles.content}>
                {body && <div className={styles.body}>{body}</div>}
                {footer && <div className={styles.footer}>{footer}</div>}
            </div>
        </div>
    );
};
