/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useEffect } from "react";
import { useTable, useSortBy, useBlockLayout, useResizeColumns, usePagination } from "react-table";
import { v4 as uuid } from "uuid";
// components
import DefaultMobileWrapper from "./components/DefaultMobileWrapper";
// constants
import { SCREEN_TYPE } from "config/constants";
// styles
import styles from "./styles/Common.module.css";
import headerStyles from "./styles/TableHeader.module.css";
import bodyStyles from "./styles/TableBody.module.css";
import cellStyles from "./styles/TableCells.module.css";
import controlsStyles from "./styles/TableControls.module.css";

import useWindowDimensions from "hooks/useWindowDimensions";
import { useShowDimension } from "hooks/useShowDimension";

import { GlobalFilter } from "./components/TableFilters";

const renderMobileWrapper = (CustomView, data) => {
    return CustomView ? <CustomView data={data} /> : <DefaultMobileWrapper tableRows={data} />;
};

const Table = ({
    columns,
    data,
    pageSizeOptions,
    setLimit,
    setPageIndex,
    pageCount: ControlledPageCount,
    itemsCount,
    onChangeSearch,
    onChangeSort
}) => {
    const { width } = useWindowDimensions();
    const { showDimension: isDesktopView } = useShowDimension(width, SCREEN_TYPE.WIDE);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        state: { pageIndex, pageSize, sortBy },
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 },
            manualPagination: true,
            pageCount: ControlledPageCount,
            autoResetPage: false,
            manualSortBy: true,
            disableSortRemove: true,
            disableMultiSort: true,
            autoResetSortBy: false
        },
        useBlockLayout,
        useResizeColumns,
        useSortBy,
        usePagination
    );

    useEffect(() => {
        onChangeSort(sortBy[0]);
    }, [onChangeSort, sortBy]);

    return (
        <div className={styles.wrapper}>
            <table {...getTableProps()} className={styles.table}>
                <thead>
                    <tr className={`${styles.table_row} ${styles.noselect}`}>
                        <GlobalFilter itemsCount={itemsCount} onChangeSearch={onChangeSearch} />
                    </tr>
                </thead>
            </table>
            <table {...getTableProps()} className={styles.table}>
                <thead>
                    {headerGroups.map((headerGroup, i) => (
                        <tr
                            {...headerGroup.getHeaderGroupProps()}
                            className={`${styles.table_row} ${styles.noselect}`}
                            key={i}>
                            {headerGroup.headers.map((column, j) => (
                                <td {...column.getHeaderProps()} className={headerStyles.table_header_cell} key={j}>
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
            <table {...getTableProps()} className={styles.table}>
                <tbody {...getTableBodyProps()}>
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
            <div className={`${controlsStyles.control_container} ${headerStyles.table_header_cell}`}>
                <button
                    onClick={() => {
                        setPageIndex(0);
                        gotoPage(0);
                    }}
                    disabled={!canPreviousPage}>
                    {"<<"}
                </button>{" "}
                <button
                    onClick={() => {
                        setPageIndex(pageIndex - 1);
                        previousPage();
                    }}
                    disabled={!canPreviousPage}>
                    {"<"}
                </button>{" "}
                <button
                    onClick={() => {
                        setPageIndex(pageIndex + 1);
                        nextPage();
                    }}
                    disabled={!canNextPage}>
                    {">"}
                </button>{" "}
                <button
                    onClick={() => {
                        setPageIndex(pageCount - 1);
                        gotoPage(pageCount - 1);
                    }}
                    disabled={!canNextPage}>
                    {">>"}
                </button>{" "}
                <span>
                    Page{" "}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{" "}
                </span>
                <span>
                    | Go to page:{" "}
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0;
                            setPageIndex(page);
                            gotoPage(page);
                        }}
                        style={{ width: "100px" }}
                    />
                </span>{" "}
                <select
                    value={pageSize}
                    onChange={(e) => {
                        setLimit(Number(e.target.value));
                        setPageSize(Number(e.target.value));
                    }}>
                    {pageSizeOptions.map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Table;
