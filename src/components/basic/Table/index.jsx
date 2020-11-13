/* eslint-disable prefer-const */
/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState, useEffect, useMemo } from "react";
import { useTable, useSortBy, useBlockLayout, useResizeColumns, usePagination, useRowSelect } from "react-table";
import { ColumnControlModal } from "./components/ColumnControlModal";

import Toolbar from "./components/Toolbar";
import Header from "./components/Header";
import Body from "./components/Body";
import Pagination from "./components/Pagination";
import { LoadingIndicator } from "components/common";
import styles from "./styles/Common.module.css";
import IndeterminateCheckbox from "./components/IndeterminateCheckbox";
import ActionModal from "./components/ActionModal";

const Table = ({
    columns,
    data,
    pageSizeOptions,
    setLimit,
    setPageIndex,
    pageCount: ControlledPageCount,
    itemsCount,
    onChangeSearch,
    onChangeSort,
    isLoading,
    refetch
}) => {
    const [cols, setCols] = useState(columns);

    const [controlModalOpen, setControlModalOpen] = useState(false);
    const [actoinModalOpen, setActionModalOpen] = useState(false);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        columns: groupedCols,
        page,
        prepareRow,
        pageOptions,
        gotoPage,
        pageCount,
        canNextPage,
        canPreviousPage,
        setPageSize,
        allColumns,
        setHiddenColumns,
        selectedFlatRows,
        visibleColumns,
        state: { pageIndex, pageSize, sortBy, selectedRowIds }
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
        usePagination,
        useRowSelect,
        (hooks) => {
            hooks.columns.push((columns) => [
                {
                    Header: "Select",
                    id: "selection_head",
                    columns: [
                        {
                            id: "selection",
                            Header: (
                                { getToggleAllRowsSelectedProps } // TODO: checkbox toggling visibility of the column
                            ) => (
                                <div>
                                    <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                                </div>
                            ),
                            Cell: ({ row }) => (
                                <div>
                                    <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                                </div>
                            ),
                            width: 80
                        }
                    ],
                    isVisible: false
                },
                ...columns
            ]);
        }
    );

    const groupedColsWithoutSelect = useMemo(() => groupedCols.slice(1, groupedCols.length), [groupedCols]);

    const groupedColsWithMutations = useMemo(
        () =>
            groupedColsWithoutSelect
                .filter((group) => {
                    return (
                        group.columns.filter((col) => {
                            return typeof col.mutation !== "undefined";
                        }).length > 0
                    );
                })
                .map((group) => {
                    return {
                        ...group,
                        columns: group.columns.filter((col) => {
                            return typeof col.mutation !== "undefined";
                        })
                    };
                }),
        [groupedColsWithoutSelect]
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
        const { fieldSchema } = allColumns.find((column) => column.id === id);
        onChangeSort({ id, desc, fieldSchema });
    }, [onChangeSort, sortBy, allColumns]);

    const toggleControlModal = () => {
        setControlModalOpen(!controlModalOpen);
    };

    const toggleActionModal = () => {
        setActionModalOpen(!actoinModalOpen);
    };

    return (
        <div className={styles.wrapper}>
            <Toolbar
                itemsCount={itemsCount}
                onChangeSearch={onChangeSearch}
                toggleControlModal={toggleControlModal}
                toggleActionModal={toggleActionModal}
                actionModalCanBeOpened={groupedColsWithMutations.length > 0 && selectedFlatRows.length > 0}
            />

            <div className={`${styles.overflow_scroll} ${styles.content_wrapper}`}>
                {isLoading ? (
                    <LoadingIndicator />
                ) : (
                    <>
                        <Header tableProps={getTableProps()} headerGroups={headerGroups} />

                        <Body
                            tableProps={getTableProps()}
                            bodyProps={getTableBodyProps()}
                            page={page}
                            prepareRow={prepareRow}
                        />
                    </>
                )}
            </div>

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

            <ColumnControlModal
                columns={groupedCols.slice(1, groupedCols.length)}
                setColumns={setCols}
                isOpen={controlModalOpen}
                toggle={toggleControlModal}
            />

            <ActionModal
                columns={groupedColsWithMutations}
                isOpen={actoinModalOpen}
                toggle={toggleActionModal}
                selectedRows={selectedFlatRows}
                onSubmit={refetch}
            />
        </div>
    );
};

export default Table;
