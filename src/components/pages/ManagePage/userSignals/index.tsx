/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import React, { useState, useMemo, useCallback } from "react";
import { useQuery } from "@apollo/client";
// components
import { Template } from "components/layout/Template";
import Table from "components/basic/Table";
import { LoadingIndicator } from "components/common";
// utils
import { formatUsersSignals, getSearchOptions } from "./utils";
// hooks
import useWindowDimensions from "hooks/useWindowDimensions";
// constants
import { REACT_TABLE_COLUMNS } from "./constants";
import { POLL_INTERVAL } from "config/constants";
import { PageType } from "config/types";
//graphql
import { GET_USER_SIGNALS, USER_SIGNALS_AGGREGATE } from "graphql/manage/queries";

const ITEMS_PER_PAGE_OPTIONS = [100, 500, 1000];

const ManageUserSignals = () => {
    /*States*/
    const [limit, setLimit] = useState(ITEMS_PER_PAGE_OPTIONS[0]);
    const [orderBy, setOrderBy] = useState(null);
    const { width } = useWindowDimensions(); // width hook
    const [where, setWhere] = useState(getSearchOptions(""));
    const { data: aggrData } = useQuery(USER_SIGNALS_AGGREGATE, {
        variables: { where },
        pollInterval: POLL_INTERVAL
    });

    const itemsCount = useMemo(() => aggrData?.user_signals_aggregate?.aggregate?.count, [
        aggrData?.user_signals_aggregate?.aggregate?.count
    ]);
    const pageCount = useMemo(() => Math.ceil(itemsCount / limit), [itemsCount, limit]);
    const [pageIndex, setPageIndex] = useState(0);

    const offset = useMemo(() => limit * pageIndex, [limit, pageIndex]);

    const { data, loading: isLoading } = useQuery(GET_USER_SIGNALS, {
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
                newOrderBy = { [field]: { [subfield]: sortDirection } };
            }
            setOrderBy(newOrderBy);
        }
    }, []);

    const tableColumns = useMemo(() => REACT_TABLE_COLUMNS, []);
    const tableData = useMemo(() => formatUsersSignals(data?.user_signals || []), [data?.user_signals]);
    return (
        <Template title="User signals" width={width} page={PageType.userSignals} hideToolbar>
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

export default ManageUserSignals;
