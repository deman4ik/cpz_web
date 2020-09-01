/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState, useEffect } from "react";
import { useTable, useSortBy, useBlockLayout, useResizeColumns, usePagination } from "react-table";
// components
import { ColumnControlModal } from "./components/ColumnControlModal";
import DefaultMobileWrapper from "./components/DefaultMobileWrapper";

import Toolbar from "./components/TableToolbar";
import Header from "./components/TableHeader";
import Body from "./components/TableBody";
import Pagination from "./components/TablePagination";
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
        page,
        prepareRow,
        state: { pageIndex, pageSize, sortBy },
        pageOptions,
        pageCount,
        gotoPage,
        setPageSize,
        allColumns,
        setHiddenColumns
    } = useTable(
        {
            columns: cols,
            data,
            initialState: { pageIndex: 0 },
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
        if (!sortBy[0]) return;
        const { id, desc } = sortBy[0];
        const { orderSchema, accessor } = columns.find((col) => col.id === id || col.accessor === id);
        onChangeSort({ id: accessor, desc, orderSchema });
    }, [onChangeSort, sortBy, columns]);

    const toggleModal = () => {
        setModalVisibility(!isModalVisible);
    };

    return (
        <div className={styles.wrapper}>
            <Toolbar itemsCount={itemsCount} onChangeSearch={onChangeSearch} toggleModal={toggleModal} />

            <Header tableProps={getTableProps()} headerGroups={headerGroups} />

            <Body tableProps={getTableProps()} bodyProps={getTableBodyProps()} page={page} prepareRow={prepareRow} />

            <Pagination
                tableProps={getTableProps()}
                pageOptions={pageOptions}
                pageIndex={pageIndex}
                gotoPage={gotoPage}
                setLimit={setLimit}
                pageSizeOptions={pageSizeOptions}
                pageSize={pageSize}
                setPageSize={setPageSize}
            />
            <ColumnControlModal
                data={allColumns}
                setColumns={setCols}
                title="Configure columns"
                isModalVisible={isModalVisible}
                toggleModal={toggleModal}
            />
        </div>
    );
};

export default Table;
