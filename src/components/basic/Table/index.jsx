import React from "react";
import {
    useTable,
    useSortBy,
    useFlexLayout,
    useResizeColumns,
    usePagination,
    useFilters,
    useGlobalFilter,
    useAsyncDebounce
} from "react-table";
import matchSorter from "match-sorter";
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
import paginationStyles from "./styles/TablePagination.module.css";

import useWindowDimensions from "hooks/useWindowDimensions";
import { useShowDimension } from "hooks/useShowDimension";

import { GlobalFilter } from "./components/TableFilters";

/*
export interface TableColumn {
    Header: any;
    accessor: any;
}

export interface TableProps {
    columns: TableColumn[];
    data: Array<any>;
    columnsWidth?: Array<string>;
    MobileWrapper?: React.Component | React.FC;
}
*/

const renderMobileWrapper = (CustomView, data) => {
    return CustomView ? <CustomView data={data} /> : <DefaultMobileWrapper tableRows={data} />;
};

function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

function filterGreaterThan(rows, id, filterValue) {
    return rows.filter((row) => {
        const rowValue = row.values[id];
        return rowValue >= filterValue;
    });
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = (val) => typeof val !== "number";

const Table = ({ columns, data, MobileWrapper }) => {
    const { width } = useWindowDimensions();
    const { showDimension: isDesktopView } = useShowDimension(width, SCREEN_TYPE.WIDE);

    const filterTypes = React.useMemo(
        () => ({
            // Add a new fuzzyTextFilterFn filter type.
            fuzzyText: fuzzyTextFilterFn,
            // Or, override the default text filter to use
            // "startWith"
            text: (rows, id, filterValue) => {
                return rows.filter((row) => {
                    const rowValue = row.values[id];
                    return rowValue !== undefined
                        ? String(rowValue).toLowerCase().startsWith(String(filterValue).toLowerCase())
                        : true;
                });
            }
        }),
        []
    );

    const defaultColumn = React.useMemo(
        () => ({
            minWidth: 50,
            width: 200,
            maxWidth: 300
        }),
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        state: { pageIndex, pageSize },
        state,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        visibleColumns,
        preGlobalFilteredRows,
        setGlobalFilter
    } = useTable(
        {
            columns,
            data,
            defaultColumn
            // initialState: { pageIndex: 0 }
        },
        useFlexLayout,
        useResizeColumns,
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    return (
        <div className={styles.wrapper}>
            <table {...getTableProps()} className={styles.table}>
                <tr className={`${styles.table_row} ${styles.noselect}`}>
                    <th
                        className={headerStyles.table_header_cell}
                        colSpan={visibleColumns.length}
                        style={{
                            textAlign: "right"
                        }}>
                        <GlobalFilter
                            preGlobalFilteredRows={preGlobalFilteredRows}
                            globalFilter={state.globalFilter}
                            setGlobalFilter={setGlobalFilter}
                        />
                    </th>
                </tr>
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
                                            className={`${headerStyles.resizer} ${column.isResizing ? "isResizing" : ""}
                                            `}
                                        />
                                    </div>
                                    {
                                        //<div>{column.canFilter ? column.render("Filter") : null}</div>
                                    }
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
                                {row.cells.map((cell, i) => (
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
            <div className={`${paginationStyles.pagination_container} ${cellStyles.default_cells_wrapper}`}>
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {"<<"}
                </button>{" "}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {"<"}
                </button>{" "}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {">"}
                </button>{" "}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
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
                            gotoPage(page);
                        }}
                        style={{ width: "100px" }}
                    />
                </span>{" "}
                <select
                    value={pageSize}
                    onChange={(e) => {
                        setPageSize(Number(e.target.value));
                    }}>
                    {[10, 20, 30, 40, 50].map((pageSize) => (
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
