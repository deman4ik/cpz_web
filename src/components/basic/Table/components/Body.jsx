/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from "react";

import { v4 as uuid } from "uuid";
// styles
import styles from "../styles/Common.module.css";
import bodyStyles from "../styles/Body.module.css";
import cellStyles from "../styles/Cell.module.css";

const Body = ({ tableProps, bodyProps, page, prepareRow }) => (
    <table {...tableProps} className={styles.table}>
        <tbody {...bodyProps}>
            {page.map((row) => {
                prepareRow(row);
                return (
                    <tr {...row.getRowProps()} className={bodyStyles.body_row} key={uuid()}>
                        {row.cells.map((cell) => (
                            <td
                                {...cell.getCellProps()}
                                className={`${styles.table_cell} ${cellStyles.default_cells_wrapper}`}
                                key={uuid()}>
                                {cell.render("Cell")}
                            </td>
                        ))}
                    </tr>
                );
            })}
        </tbody>
    </table>
);

export default Body;
