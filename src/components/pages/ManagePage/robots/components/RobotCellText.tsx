import React from "react";
// styles
import styles from "../styles/Robots.module.css";

/**
 * Ячейка таблицы данных пользователя
 */
const RobotCellText = (props) => {
    return (
        <div style={props?.style} className={styles.user_text_cell}>
            {props.children}
        </div>
    );
};

export default RobotCellText;
