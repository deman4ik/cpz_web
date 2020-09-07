/* eslint-disable prefer-const */
/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState, useEffect, useMemo } from "react";
import { useTable, useSortBy, useBlockLayout, useResizeColumns, usePagination } from "react-table";
// components
import { ColumnControlModal } from "./components/ColumnControlModal";
import DefaultMobileWrapper from "./components/DefaultMobileWrapper";

import Toolbar from "./components/Toolbar";
import Header from "./components/Header";
import Body from "./components/Body";
import Pagination from "./components/Pagination";
// constants
import { SCREEN_TYPE } from "config/constants";
// styles
import styles from "./styles/Common.module.css";

import useWindowDimensions from "hooks/useWindowDimensions";
import { useShowDimension } from "hooks/useShowDimension";

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
    const [cols, setCols] = useState(columns);
    const [isModalVisible, setModalVisibility] = useState(false);

    const { width } = useWindowDimensions();
    const { showDimension: isDesktopView } = useShowDimension(width, SCREEN_TYPE.WIDE);

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
        setPageSize,
        allColumns,
        setHiddenColumns
    } = useTable(
        {
            columns: cols,
            data,
            initialState: {
                pageIndex: 0
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
        const { orderSchema } = allColumns.find((column) => column.id === id);
        onChangeSort({ id, desc, orderSchema });
    }, [onChangeSort, sortBy, allColumns]);

    const toggleModal = () => {
        setModalVisibility(!isModalVisible);
    };

    return (
        <div className={styles.wrapper}>
            <Toolbar itemsCount={itemsCount} onChangeSearch={onChangeSearch} toggleModal={toggleModal} />

            <div className={styles.horizontal_overflow_scroll}>
                <Header tableProps={getTableProps()} headerGroups={headerGroups} />

                <Body
                    tableProps={getTableProps()}
                    bodyProps={getTableBodyProps()}
                    page={page}
                    prepareRow={prepareRow}
                />
            </div>

            <Pagination
                pageOptions={pageOptions}
                pageIndex={pageIndex}
                gotoPage={gotoPage}
                setLimit={setLimit}
                pageSizeOptions={pageSizeOptions}
                pageSize={pageSize}
                setPageSize={setPageSize}
                setPageIndex={setPageIndex}
            />

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
