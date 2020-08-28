import React from "react";
// styles
import styles from "./Cells.module.css";

export interface DefaultCellWrapperProps {
    style?: React.CSSProperties;
    children: React.ReactNode;
}

/**
 *  Враппер для ячейки таблицы
 */
const DefaultCellWrapper: React.FC<DefaultCellWrapperProps> = (props) => {
    return (
        <div style={props?.style} className={styles.default_cells_wrapper}>
            {props.children}
        </div>
    );
};

export default DefaultCellWrapper;
