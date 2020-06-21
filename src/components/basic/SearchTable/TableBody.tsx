import React from "react";
// styles
import styles from "./styles/Common.module.css";
import bodyStyles from "./styles/TableBody.module.css";

export interface TableBodyProps {
    tableBody: Array<any>;
    columnsWidth?: Array<string>;
}

//TODO:  пробросить keys
/*Тело таблицы*/
const TableBody: React.FC<TableBodyProps> = ({ tableBody, columnsWidth }) => {
    let content = [];
    if (!columnsWidth) {
        content = tableBody.map((row) => {
            const cellsData = row.map((cell) => (
                <td className={styles.table_cell} {...cell?.props}>
                    {cell.component}
                </td>
            ));
            return <tr {...row} className={bodyStyles.body_row}>{cellsData}</tr>;
        });
    } else {
        content = tableBody.map((row) => {
            const cellsData = columnsWidth.map((width, index) => (
                <td style={{ width }} className={styles.table_cell} {...row.cells[index]?.props}>
                    {row.cells[index]?.component}
                </td>
            ));
            return <tr {...row} className={bodyStyles.body_row}>{cellsData}</tr>;
        });
    }
    return <tbody>{content}</tbody>;
};

export default TableBody;
