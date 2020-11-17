import React, { FC, memo } from "react";
import { useTableFilters } from "hooks/useTableFilters";
import { useQueryWithAuth } from "hooks/useQueryWithAuth";
import { POLL_INTERVAL } from "config/constants";
import { TableComponent } from "components/pages/ManagePage/common/TableComponent";
import { ColumnsArraySchema } from "components/pages/ManagePage/utils";
import { QueryType } from "components/pages/ManagePage/common/types";

export interface TableWithQueryProps {
    tableStyles?: any;
    headerStyles?: any;
    withoutPagination?: boolean;
    aggregate_query: QueryType;
    query: QueryType;
    columns: ColumnsArraySchema;
    formatData?: (data: any) => any;
    getItemsCount?: (data: any) => number;
    getSearchOptions?: (data: any) => any;
    onRowClick?: (data?: any) => any;
}

export const TableWithQueryComponent: FC<TableWithQueryProps> = ({
    formatData,
    tableStyles,
    getSearchOptions,
    getItemsCount,
    withoutPagination,
    onRowClick,
    headerStyles,
    columns,
    aggregate_query,
    query
}) => {
    const { filters, setFilters, setPageIndex, offset, getPageCount } = useTableFilters({
        getSearchOptions
    });
    const { where, limit, orderBy } = filters;

    const { data: aggrData } = useQueryWithAuth(true, aggregate_query, {
        variables: { where },
        pollInterval: POLL_INTERVAL
    });
    const itemsCount = aggrData && getItemsCount ? getItemsCount(aggrData) : 0;
    const pageCount = getPageCount(itemsCount);

    const { data, loading } = useQueryWithAuth(true, query, {
        variables: { limit, where, offset, order_by: orderBy }
    });

    const tableData = data && formatData ? formatData(data) : data || [];

    // const onClick = () => onRowClick(tableData.find((i) => i.backtest_stats));
    return (
        <TableComponent
            headerStyles={headerStyles}
            withoutPagination={withoutPagination}
            onRowClick={onRowClick}
            tableStyles={tableStyles}
            columns={columns}
            setFilters={setFilters}
            getSearchOptions={getSearchOptions}
            setPageIndex={setPageIndex}
            pageCount={pageCount}
            itemsCount={itemsCount}
            data={tableData}
            loading={loading}
        />
    );
};

export const TableWithQuery = memo(TableWithQueryComponent);
