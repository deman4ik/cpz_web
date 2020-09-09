import React from "react";
import { v4 as uuid } from "uuid";
// styles
import styles from "./Mobile.module.css";

/**
 *  Дефолтное представление ячейки таблицы
 */
export interface MobileViewProps {
    data: Array<any>;
}
const MobileView: React.FC<MobileViewProps> = ({ data }) => (
    <div className={styles.mobile_container}>
        {data.map(({ title, value }) => (
            <div className={styles.mobile_item} key={uuid()}>
                <div className={styles.mobile_item_title}>{title}</div>
                <div className={styles.mobile_item_val}>{value}</div>
            </div>
        ))}
    </div>
);

export default MobileView;
