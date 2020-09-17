/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import React, { useState, useMemo, useCallback } from "react";
import { useQuery } from "@apollo/client";
// components
import { ManagementTemplate } from "components/layout";
import Table from "components/basic/Table";
// hooks
import { POLL_INTERVAL } from "config/constants";

const ITEMS_PER_PAGE_OPTIONS =
    process.env.NODE_ENV === "development" ? [2, 3, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17, 20, 25] : [100, 500, 1000];

const ManagePageTemplate = ({
    pageType,
    columns,
    dataQuery,
    aggregateQuery,
    formatData,
    getItemsCount,
    getSearchOptions
}) => {
    /*States*/
    const [limit, setLimit] = useState(ITEMS_PER_PAGE_OPTIONS[0]);
    const [orderBy, setOrderBy] = useState(null);
    const [where, setWhere] = useState(getSearchOptions(""));

    const { data: aggrData } = useQuery(aggregateQuery, {
        variables: { where },
        pollInterval: POLL_INTERVAL
    });

    const itemsCount = useMemo(() => (aggrData ? getItemsCount(aggrData) : 0), [getItemsCount, aggrData]);

    const pageCount = useMemo(() => Math.ceil(itemsCount / limit), [itemsCount, limit]);
    const [pageIndex, setPageIndex] = useState(0);

    const offset = useMemo(() => limit * pageIndex, [limit, pageIndex]);

    const { data, loading: isLoading } = useQuery(dataQuery, {
        variables: { limit, where, offset, order_by: orderBy }
    });

    const onChangeSearch = useCallback(
        (value) => {
            const trimmedVal = value.trim();
            if (trimmedVal) {
                setWhere(getSearchOptions(trimmedVal));
            } else {
                setWhere(null);
            }
        },
        [getSearchOptions]
    );

    const onChangeSort = useCallback((column) => {
        if (column) {
            const { id, desc, orderSchema } = column;
            const sortDirection = desc ? "desc" : "asc";
            let newOrderBy;
            if (!orderSchema) newOrderBy = { [id]: sortDirection };
            else {
                const { field, subfield } = orderSchema;
                newOrderBy = { [field]: subfield ? { [subfield]: sortDirection } : sortDirection };
            }
            setOrderBy(newOrderBy);
        }
    }, []);

    const tableColumns = useMemo(() => columns, [columns]);
    const tableData = useMemo(() => (data ? formatData(data) : []), [formatData, data]);

    return (
        <ManagementTemplate title={pageType} page={pageType}>
            <Table
                columns={tableColumns}
                data={tableData}
                pageSizeOptions={ITEMS_PER_PAGE_OPTIONS}
                setLimit={setLimit}
                setPageIndex={setPageIndex}
                pageCount={pageCount}
                itemsCount={itemsCount}
                onChangeSearch={onChangeSearch}
                onChangeSort={onChangeSort}
                isLoading={isLoading}
            />
        </ManagementTemplate>
    );
};

export default ManagePageTemplate;
