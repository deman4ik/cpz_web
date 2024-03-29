/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from "react";

// styles
import styles from "../styles/Common.module.css";
import headerStyles from "../styles/Header.module.css";

const Header = ({ tableProps, headerGroups, headerStyles: customHeaderStyles }) => (
    <table {...tableProps} className={`${styles.table} ${headerStyles.table_header}`}>
        <thead>
            {headerGroups.map((headerGroup, i) => (
                <tr
                    {...headerGroup.getHeaderGroupProps({ style: customHeaderStyles })}
                    className={`${styles.table_row} ${styles.noselect}`}
                    key={i}>
                    {headerGroup.headers.map((column, j) => (
                        <td
                            {...column.getHeaderProps({ style: customHeaderStyles })}
                            className={headerStyles.table_header_cell}
                            key={j}>
                            <div {...column.getSortByToggleProps()}>
                                {column.render("Header")}
                                <span>{column.isSorted ? (column.isSortedDesc ? " ↓" : " ↑") : "  "}</span>
                            </div>
                            <div {...column.getResizerProps()} className={headerStyles.resizer_wrapper}>
                                <div
                                    className={`${headerStyles.resizer} ${
                                        column.isResizing ? `${headerStyles.isResizing}` : ""
                                    }
                                        `}
                                />
                            </div>
                            {column.canFilter ? column.render("Filter") : null}
                        </td>
                    ))}
                </tr>
            ))}
        </thead>
    </table>
);

export default Header;
