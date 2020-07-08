import React, { memo } from "react";
import { v4 as uuid } from "uuid";
// styles
import styles from "../styles/User.module.css";

export interface NotDesktopProps {
    data: Array<any>;
}

const UserCellNotDesktopView: React.FC<NotDesktopProps> = memo(({ data }) => {
    return (
        <div className={styles.not_desktop_container}>
            {data.map(({ title, notDesktopVal }) => (
                <div className={styles.not_desktop_item} key={uuid()}>
                    <div className={styles.not_desktop_item_title}>{title}</div>
                    <div className={styles.not_desktop_item_val}>{notDesktopVal}</div>
                </div>
            ))}
        </div>
    );
});

export default UserCellNotDesktopView;
