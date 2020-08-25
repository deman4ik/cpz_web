import React, { memo } from "react";
import { TableInstance } from "./index";
import { v4 as uuid } from "uuid";
// styles
import styles from "./styles/Common.module.css";
import bodyStyles from "./styles/TableBody.module.css";

export interface TableBodyProps {
    tableInstance: TableInstance;
    columnsWidth?: Array<string>;
}

const TableBody: React.FC<TableBodyProps> = ({
    tableInstance: { getTableBodyProps, rows, prepareRow },
    columnsWidth
}) => {
    return (
        <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
                prepareRow(row);
                return (
                    <tr {...row.getRowProps()} style={row?.style} className={bodyStyles.body_row} key={uuid()}>
                        {row.cells.map((cell, i) => (
                            <td
                                {...cell.getCellProps()}
                                style={columnsWidth[i] ? { width: columnsWidth[i] } : { width: "auto" }}
                                className={styles.table_cell}
                                key={uuid()}>
                                {cell.render("Cell")}
                            </td>
                        ))}
                    </tr>
                );
            })}
        </tbody>
    );
};

export default memo(TableBody);
