import React from "react";
import styles from "./MadeToHelpItem.module.css";

export const MadeToHelpItem = ({ item }): any => {
    return (
        <div className={styles.row}>
            <div className={styles.col}>
                <div className={styles.colBody}>
                    <item.icon />
                    <p className={styles.colTitle}>{item.title}</p>
                    <p className={styles.colDescription}>{item.description}</p>
                </div>
                <div className={styles.colFooter} />
            </div>
        </div>
    );
};
