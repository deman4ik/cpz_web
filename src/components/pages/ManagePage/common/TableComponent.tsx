import React, { FC, memo, useMemo } from "react";
import Table from "components/basic/Table";
import { ITEMS_PER_PAGE_OPTIONS } from "components/pages/ManagePage/common/constants";
import { OrderBy } from "config/types";
import { ColumnsArraySchema } from "components/pages/ManagePage/utils";

interface TableComponentProps {
    tableStyles?: any;
    headerStyles?: any;
    setFilters: (value: any) => void;
    columns: ColumnsArraySchema;
    getSearchOptions: (data: any) => any;
    itemsCount: number;
    pageCount: number;
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
        pageCount,
        itemsCount,
        onRowClick,
        data,
        headerStyles,
        loading
    } = props;
    const setLimit = (limit: any) => setFilters((prev) => ({ ...prev, limit }));
    const setWhere = (where: any) => setFilters((prev) => ({ ...prev, where }));
    const setOrderBy = (orderBy: any) => setFilters((prev) => ({ ...prev, orderBy }));

    const onChangeSearch = (value) => {
        const trimmedVal = value.trim();
        if (trimmedVal) {
            setWhere(getSearchOptions(trimmedVal));
        } else {
            setWhere(null);
        }
    };

    const onChangeSort = (column: { id: string; desc: boolean; sortSchema: { field: string; subfield: string } }) => {
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
    };

    const tableColumns = useMemo(() => columns, [columns]);

    return (
        <Table
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