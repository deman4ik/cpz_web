import React from "react";
// styles
import styles from "../styles/User.module.css";

const UserCellNotDesktopView = ({ data }) => {
    return (
        <div className={styles.not_desktop_container}>
            {data.map(({ title, notDesktopVal }) => (
                <div className={styles.not_desktop_item}>
                    <div className={styles.not_desktop_item_title}>{title}</div>
                    <div className={styles.not_desktop_item_val}>{notDesktopVal}</div>
                </div>
            ))}
        </div>
    );
};

export default UserCellNotDesktopView;
