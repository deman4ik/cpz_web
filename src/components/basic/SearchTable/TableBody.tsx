import React, { memo } from "react";
import { v4 as uuid } from "uuid";
// styles
import styles from "./styles/Common.module.css";
import bodyStyles from "./styles/TableBody.module.css";

export interface TableBodyProps {
    tableRows: Array<any>;
    columnsWidth?: Array<string>;
}

/*Тело таблицы*/
const TableBody: React.FC<TableBodyProps> = ({ tableRows, columnsWidth }) => {
    let content = [];
    if (!columnsWidth) {
        content = tableRows.map((row) => {
            const cellsData = row.cells.map((cell) => (
                <td className={styles.table_cell} {...cell?.props} key={uuid()}>
                    {cell.component}
                </td>
            ));
            return (
                <tr style={row?.style} className={bodyStyles.body_row} key={uuid()}>
                    {cellsData}
                </tr>
            );
        });
    } else {
        content = tableRows.map((row) => {
            const cellsData = columnsWidth.map((width, index) => (
                <td style={{ width }} className={styles.table_cell} {...row.cells[index]?.props} key={uuid()}>
                    {row.cells[index]?.component}
                </td>
            ));
            return (
                <tr style={row?.style} className={bodyStyles.body_row} key={uuid()}>
                    {cellsData}
                </tr>
            );
        });
    }
    return <tbody>{content}</tbody>;
};

export default memo(TableBody);
