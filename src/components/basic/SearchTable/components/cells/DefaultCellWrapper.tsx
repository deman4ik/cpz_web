import React from "react";
// styles
import styles from "./Cells.module.css";
/**
 *  Враппер для ячейки таблицы
 */
const DefaultCellWrapper = (props) => {
    return (
        <div style={props?.style} className={styles.default_cells_wrapper}>
            {props.children}
        </div>
    );
};

export default DefaultCellWrapper;
