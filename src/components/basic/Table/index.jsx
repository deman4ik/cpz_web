/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState, useEffect, useMemo } from "react";
import { useTable, useSortBy, useBlockLayout, useResizeColumns, usePagination } from "react-table";
import { v4 as uuid } from "uuid";
// components
import { Button } from "../Button";
import { Select } from "../Select";
import { ColumnControlModal } from "./components/ColumnControlModal";
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
    const [isModalVisible, setModalVisibility] = useState(false);

    const { width } = useWindowDimensions();
    const { showDimension: isDesktopView } = useShowDimension(width, SCREEN_TYPE.WIDE);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        state: { pageIndex, pageSize, sortBy },
        pageOptions,
        pageCount,
        gotoPage,
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
        if (!sortBy[0]) return;
        const { id, desc } = sortBy[0];
        const { orderSchema } = columns.find((col) => col.accessor === id);
        onChangeSort({ id, desc, orderSchema });
    }, [onChangeSort, sortBy, columns]);

    const toggleModal = () => {
        console.log(isModalVisible);
        setModalVisibility(!isModalVisible);
    };

    return (
        <div className={styles.wrapper}>
            <table {...getTableProps()} className={styles.table}>
                <thead>
                    <tr className={`${styles.table_row} ${styles.noselect}`}>
                        <td>
                            <GlobalFilter itemsCount={itemsCount} onChangeSearch={onChangeSearch} />
                        </td>
                        <td>
                            <Button title="Configure" icon="settings" onClick={toggleModal} />
                        </td>
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
            <table {...getTableProps()} className={styles.table}>
                <tbody>
                    <tr className={`${styles.table_row}`}>
                        <td className={`${headerStyles.table_header_cell}`}>
                            <div className={`${paginationStyles.pagination_container}`}>
                                <div className={paginationStyles.pagination_button_group}>
                                    {pageOptions.map((num, i) => (
                                        <div
                                            key={i}
                                            className={pageIndex === num ? paginationStyles.page_selected : ""}>
                                            <Button
                                                title={num + 1}
                                                onClick={() => {
                                                    setPageIndex(num);
                                                    gotoPage(num);
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <Select
                                    width={110}
                                    value={pageSize}
                                    data={pageSizeOptions.map((size) => ({ value: size, label: `Show ${size}` }))}
                                    onChangeValue={(value) => {
                                        setLimit(Number(value));
                                        setPageSize(Number(value));
                                    }}
                                />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            {
                //<ColumnControlModal title="Configure columns" isModalVisible={isModalVisible} toggleModal={toggleModal} />
            }
        </div>
    );
};

export default Table;
