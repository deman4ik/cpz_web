/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import React, { useState, useMemo, useCallback } from "react";
import { useQuery } from "@apollo/client";
// components
import { Template } from "components/layout/Template";
import Table from "components/basic/Table";
import { LoadingIndicator } from "components/common";
// hooks
import useWindowDimensions from "hooks/useWindowDimensions";
import { POLL_INTERVAL } from "config/constants";

const ITEMS_PER_PAGE_OPTIONS = [10, 100, 500, 1000];

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
    const [limit, setLimit] = useState(1);
    const [orderBy, setOrderBy] = useState(null);
    const { width } = useWindowDimensions(); // width hook
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

    const onChangeSearch = (value) => {
        const trimmedVal = value.trim();
        if (trimmedVal) {
            setWhere(getSearchOptions(trimmedVal));
        } else {
            setWhere(null);
        }
    };

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
            console.log(newOrderBy);
            setOrderBy(newOrderBy);
        }
    }, []);

    const tableColumns = useMemo(() => columns, [columns]);
    const tableData = useMemo(() => (data ? formatData(data) : []), [formatData, data]);
    return (
        <Template title={pageType} width={width} page={pageType} hideToolbar>
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
            />
            {isLoading ? <LoadingIndicator /> : null}
        </Template>
    );
};

export default ManagePageTemplate;
