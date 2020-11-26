import React, { FC, memo, useCallback, useMemo } from "react";
import Table from "components/basic/Table";
import { ITEMS_PER_PAGE_OPTIONS } from "components/pages/ManagePage/common/constants";
import { OrderBy } from "config/types";
import { ColumnsArraySchema } from "components/pages/ManagePage/utils";

interface TableComponentProps {
    tableStyles?: any;
    refetch?: () => void;
    headerStyles?: any;
    setFilters: (value: any) => void;
    columns: ColumnsArraySchema;
    getSearchOptions?: (data: any) => any;
    itemsCount?: number;
    pageCount?: number;
    withoutPagination?: boolean;
    setPageIndex: (index: number) => void;
    onRowClick?: (params?: any) => any;
    data: any;
    loading: boolean;
}

const _TableComponent: FC<TableComponentProps> = (props) => {
    const {
        columns,
        setFilters,
        getSearchOptions,
        tableStyles,
        withoutPagination,
        setPageIndex,
        pageCount = 1,
        itemsCount = 0,
        onRowClick,
        data,
        refetch,
        headerStyles,
        loading
    } = props;
    const setLimit = useCallback((limit: any) => setFilters((prev) => ({ ...prev, limit })), [setFilters]);
    const setWhere = useCallback((where: any) => setFilters((prev) => ({ ...prev, where })), [setFilters]);
    const setOrderBy = useCallback((orderBy: any) => setFilters((prev) => ({ ...prev, orderBy })), [setFilters]);

    const onChangeSearch = (value) => {
        const trimmedVal = value.trim();
        if (trimmedVal && getSearchOptions) {
            setWhere(getSearchOptions(trimmedVal));
        } else {
            setWhere(null);
        }
    };

    const onChangeSort = useCallback(
        (column: { id: string; desc: boolean; sortSchema: { field: string; subfield: string } }) => {
            if (column) {
                const { id, desc, sortSchema } = column;
                const sortDirection = desc ? "desc" : "asc";
                let newOrderBy: OrderBy = {
                    [id]: sortDirection
                };
                if (sortSchema) {
                    const { field, subfield } = sortSchema;
                    newOrderBy = { [field]: subfield ? { [subfield]: sortDirection } : sortDirection };
                }
                setOrderBy(newOrderBy);
            }
        },
        [setOrderBy]
    );

    const tableColumns = useMemo(() => columns, [columns]);

    return (
        <Table
            refetch={refetch}
            withoutPagination={withoutPagination}
            onRowClick={onRowClick}
            headerStyles={headerStyles}
            tableStyles={tableStyles}
            columns={tableColumns}
            data={data}
            pageSizeOptions={ITEMS_PER_PAGE_OPTIONS}
            setLimit={setLimit}
            setPageIndex={setPageIndex}
            pageCount={pageCount}
            itemsCount={itemsCount}
            onChangeSearch={onChangeSearch}
            onChangeSort={onChangeSort}
            isLoading={loading}
        />
    );
};

export const TableComponent = memo(_TableComponent);
