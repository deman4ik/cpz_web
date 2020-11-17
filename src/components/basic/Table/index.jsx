/* eslint-disable prefer-const */
/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState, useEffect } from "react";
import { useTable, useSortBy, useBlockLayout, useResizeColumns, usePagination } from "react-table";
// components
import { ColumnControlModal } from "./components/ColumnControlModal";

import Toolbar from "./components/Toolbar";
import Header from "./components/Header";
import Body from "./components/Body";
import Pagination from "./components/Pagination";
import { LoadingIndicator } from "components/common";
// styles
import styles from "./styles/Common.module.css";

const Table = ({
    columns,
    data,
    withoutPagination,
    pageSizeOptions,
    setLimit,
    setPageIndex,
    pageCount: ControlledPageCount,
    itemsCount,
    tableStyles,
    headerStyles,
    onChangeSearch,
    onChangeSort,
    onRowClick,
    isLoading
}) => {
    const [cols, setCols] = useState(columns);
    const [isModalVisible, setModalVisibility] = useState(false);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        columns: groupedCols,
        page,
        prepareRow,
        state: { pageIndex, pageSize, sortBy },
        pageOptions,
        gotoPage,
        pageCount,
        canNextPage,
        canPreviousPage,
        setPageSize,
        allColumns,
        setHiddenColumns
    } = useTable(
        {
            columns: cols,
            data,
            initialState: {
                pageIndex: 0,
                pageSize: pageSizeOptions[0]
            },
            manualPagination: true,
            pageCount: ControlledPageCount,
            autoResetPage: false,
            manualSortBy: true,
            disableSortRemove: true,
            disableMultiSort: true,
            autoResetSortBy: false,
            autoResetHiddenColumns: false
        },
        useBlockLayout,
        useResizeColumns,
        useSortBy,
        usePagination
    );

    useEffect(() => {
        // creating allColumns-like array since isVisible is being set to true by default
        const flatCols = [];
        cols.forEach((col) => flatCols.push(...col.columns));

        setHiddenColumns(flatCols.filter((col) => !col.isVisible).map((col) => col.id || col.accessor));
    }, [cols, setHiddenColumns]);

    useEffect(() => {
        if (!sortBy[0]) return;
        const { id, desc } = sortBy[0];

        // allColumns contains all the nested columns
        const { sortSchema } = allColumns.find((column) => column.id === id);
        onChangeSort({ id, desc, sortSchema });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortBy, allColumns]);

    const toggleModal = () => {
        setModalVisibility(!isModalVisible);
    };

    return (
        <div className={styles.wrapper} style={tableStyles}>
            {!!itemsCount && (
                <Toolbar itemsCount={itemsCount} onChangeSearch={onChangeSearch} toggleModal={toggleModal} />
            )}

            <div className={`${styles.overflow_scroll} ${styles.content_wrapper}`}>
                {isLoading ? (
                    <LoadingIndicator />
                ) : (
                    <>
                        <Header tableProps={getTableProps()} headerGroups={headerGroups} headerStyles={headerStyles} />

                        <Body
                            onRowClick={onRowClick}
                            tableProps={getTableProps()}
                            bodyProps={getTableBodyProps()}
                            page={page}
                            prepareRow={prepareRow}
                        />
                    </>
                )}
            </div>

            {!withoutPagination && (
                <Pagination
                    tableInstance={{
                        pageOptions,
                        pageIndex,
                        gotoPage,
                        pageCount,
                        canNextPage,
                        canPreviousPage
                    }}
                    setLimit={setLimit}
                    pageSizeOptions={pageSizeOptions}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                    setPageIndex={setPageIndex}
                />
            )}

            <ColumnControlModal
                columns={groupedCols}
                setColumns={setCols}
                title="Configure columns"
                isModalVisible={isModalVisible}
                toggleModal={toggleModal}
            />
        </div>
    );
};

export default Table;
