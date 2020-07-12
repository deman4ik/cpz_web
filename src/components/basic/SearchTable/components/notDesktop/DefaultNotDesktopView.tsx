import React from "react";
import { v4 as uuid } from "uuid";
// styles
import styles from "./NotDesktop.module.css";

/**
 *  Дефолтное представление ячейки таблицы
 */
export interface DefaultNotDesktopViewProps {
    data: Array<any>;
}
const DefaultNotDesktopView: React.FC<DefaultNotDesktopViewProps> = ({ data }) => (
    <div className={styles.not_desktop_container}>
        {data.map(({ title, notDesktopVal }) => (
            <div className={styles.not_desktop_item} key={uuid()}>
                <div className={styles.not_desktop_item_title}>{title}</div>
                <div className={styles.not_desktop_item_val}>{notDesktopVal}</div>
            </div>
        ))}
    </div>
);

export default DefaultNotDesktopView;
