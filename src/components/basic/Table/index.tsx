import React from "react";
import { useTable, useSortBy } from "react-table";
import { v4 as uuid } from "uuid";
// components
import DefaultMobileWrapper from "./components/DefaultMobileWrapper";
import { RobotsLoadMore } from "components/ui/RobotsLoadMore";
// constants
import { SCREEN_TYPE } from "config/constants";
// styles
import styles from "./styles/Common.module.css";
import bodyStyles from "./styles/TableBody.module.css";
import headerStyles from "./styles/TableHeader.module.css";
import useWindowDimensions from "hooks/useWindowDimensions";
import { useShowDimension } from "hooks/useShowDimension";

export interface TableColumn {
    Header: any;
    accessor: any;
}

/*types*/
export interface TableProps {
    columns: TableColumn[];
    data: Array<any>;
    columnsWidth?: Array<string>;
    MobileWrapper?: React.Component | React.FC;
    loadButton: {
        handleFetchMore: () => void;
        maxCount: number;
        limitStep: number;
    };
}

const renderMobileWrapper = (CustomView, data) => {
    return CustomView ? <CustomView data={data} /> : <DefaultMobileWrapper tableRows={data} />;
};

const Table: React.FC<TableProps> = ({
    columns,
    data,
    columnsWidth,
    MobileWrapper,
    loadButton: { handleFetchMore, maxCount }
}) => {
    /*Работа с форматом отображения*/
    const { width } = useWindowDimensions();
    const { showDimension: isDesktopView } = useShowDimension(width, SCREEN_TYPE.WIDE);

    /*Определение пропсов кнопки*/
    const loadButtonProps = {
        onFetchMore: handleFetchMore,
        isLoadingMore: false,
        renderLoadMoreButton: data.length < maxCount
    };

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
        {
            columns,
            data
        },
        useSortBy
    );

    return (
        <div className={styles.wrapper}>
            {isDesktopView ? (
                <>
                    <table {...getTableProps()} className={styles.table}>
                        <thead>
                            {headerGroups.map((headerGroup, i) => (
                                <tr {...headerGroup.getHeaderGroupProps()} className={styles.table_row} key={i}>
                                    {headerGroup.headers.map((column, j) => (
                                        <td
                                            {...column.getHeaderProps(column.getSortByToggleProps())}
                                            style={columnsWidth[j] ? { width: columnsWidth[j] } : { width: "auto" }}
                                            className={headerStyles.table_header_cell}
                                            key={j}>
                                            {column.render("Header")}
                                            <span>{column.isSorted ? (column.isSortedDesc ? "↓" : "↑") : ""}</span>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                    </table>
                    <table {...getTableProps()} className={styles.table}>
                        <tbody {...getTableBodyProps()}>
                            {rows.map((row) => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()} className={bodyStyles.body_row} key={uuid()}>
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
                    </table>
                </>
            ) : (
                renderMobileWrapper(MobileWrapper, data)
            )}
            <div>
                <RobotsLoadMore {...loadButtonProps} />
            </div>
        </div>
    );
};

export default Table;
