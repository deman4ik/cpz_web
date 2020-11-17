/* eslint-disable prefer-const */
/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useTable, useSortBy, useBlockLayout, useResizeColumns, usePagination, useRowSelect } from "react-table";
import { ColumnControlModal } from "./components/ColumnControlModal";
import Toolbar from "./components/Toolbar";
import Header from "./components/Header";
import Body from "./components/Body";
import Pagination from "./components/Pagination";
import { LoadingIndicator } from "components/common";
import styles from "./styles/Common.module.css";
import ActionModal from "./components/ActionModal";
import { CaptionButton, CheckBox } from "components/basic";

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
    isLoading,
    refetch
}) => {
    const [cols, setCols] = useState(columns);

    const [controlModalOpen, setControlModalOpen] = useState(false);
    const [actionModalOpen, setActionModalOpen] = useState(false);
    const [selectEnabled, setSelectEnabled] = useState(false);

    const toggleSelect = useCallback(() => setSelectEnabled(!selectEnabled), [selectEnabled]);

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
        state: { pageIndex, pageSize, sortBy }
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
            autoResetHiddenColumns: false,
            selectEnabled,
            toggleSelect
        },
        useBlockLayout,
        useResizeColumns,
        useSortBy,
        usePagination,
        useRowSelect,
        (hooks) => {
            const getCheckBoxCellStyle = (show = true) => ({
                display: show ? "flex" : "none",
                justifyContent: "center",
                width: "100%"
            });

            hooks.columns.push((columns) => [
                {
                    Header: ({ toggleSelect: toggle, selectEnabled: checkboxesShown }) => (
                        <div style={getCheckBoxCellStyle()}>
                            <CaptionButton
                                icon={checkboxesShown ? "close" : "plusbox"}
                                onClick={toggle}
                                style={{ height: "unset", color: "white" }}
                            />
                        </div>
                    ),
                    id: "selection_head",
                    columns: [
                        {
                            id: "selection",
                            Header: ({ getToggleAllRowsSelectedProps, selectEnabled: checkboxesShown }) => (
                                <div style={getCheckBoxCellStyle(checkboxesShown)}>
                                    <CheckBox {...getToggleAllRowsSelectedProps()} />
                                </div>
                            ),
                            Cell: ({ row, selectEnabled: checkboxesShown }) => (
                                <div style={getCheckBoxCellStyle(checkboxesShown)}>
                                    <CheckBox {...row.getToggleRowSelectedProps()} />
                                </div>
                            ),
                            width: 65
                        }
                    ],
                    isVisible: false
                },
                ...columns
            ]);
        }
    );

    const groupedColsWithoutSelect = useMemo(
        () => (selectEnabled ? groupedCols.slice(1, groupedCols.length) : groupedCols),
        [selectEnabled, groupedCols]
    );

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

        setHiddenColumns([
            ...flatCols.filter((col) => !col.isVisible).map((col) => col.id || col.accessor),
            ...(groupedColsWithMutations.length === 0 ? ["selection"] : [])
        ]);
    }, [cols, groupedColsWithMutations.length, setHiddenColumns]);

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
        setActionModalOpen(!actionModalOpen);
    };

    return (
        <div className={styles.wrapper} style={tableStyles}>
            {!!itemsCount && (
                <Toolbar
                    itemsCount={itemsCount}
                    onChangeSearch={onChangeSearch}
                    toggleControlModal={toggleControlModal}
                    toggleActionModal={toggleActionModal}
                    actionModalCanBeOpened={
                        selectEnabled && groupedColsWithMutations.length > 0 && selectedFlatRows.length > 0
                    }
                />
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
                columns={groupedCols.slice(1, groupedCols.length)}
                setColumns={setCols}
                isOpen={controlModalOpen}
                toggle={toggleControlModal}
            />

            <ActionModal
                columns={groupedColsWithMutations}
                isOpen={actionModalOpen}
                toggle={toggleActionModal}
                selectedRows={selectedFlatRows}
                onSubmit={refetch}
            />
        </div>
    );
};

export default Table;
