/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import React, { useState, useMemo } from "react";
import { useQuery } from "@apollo/client";
// components
import { Template } from "components/layout/Template";
import Table from "components/basic/Table";
// utils
import { rtUserSignalsFormat, getSearchWhere } from "./utils";
// hooks
import useWindowDimensions from "hooks/useWindowDimensions";
// constants
import { REACT_TABLE_COLUMNS, COLUMNS_WIDTH } from "./constants";
import { POLL_INTERVAL } from "config/constants";
import { INITIAL_ORDER, SORT_SETTINGS } from "./Order.settings";
import { PageType } from "config/types";
//graphql
import { GET_USER_SIGNALS, USER_SIGNALS_AGGREGATE } from "graphql/manage/queries";

const LIMIT_STEP = 999;

const ManageUserSignals = () => {
    /*States*/
    const [limit, setLimit] = useState(LIMIT_STEP);
    const [orderState, setOrderState] = useState(INITIAL_ORDER);
    const { width } = useWindowDimensions(); // width hook
    const [where, setWhere] = useState(getSearchWhere(""));

    const {
        sort: { order_by }
    } = orderState;
    /*Fetch data*/
    const { data } = useQuery(GET_USER_SIGNALS /*, {
        variables: { limit, where, order_by }
    }*/);

    const { data: aggrData } = useQuery(USER_SIGNALS_AGGREGATE, {
        variables: { where },
        pollInterval: POLL_INTERVAL
    });

    /*handlers*/
    const callbackMore = () => {
        setLimit(data.user_signals.length + LIMIT_STEP);
    };
    const searchCallback = (value) => {
        const trimmedVal = value.trim();
        if (trimmedVal) {
            setWhere(getSearchWhere(trimmedVal));
            setLimit(aggrData.user_signals_aggregate.aggregate.count);
        } else {
            setWhere(null);
            setLimit(LIMIT_STEP);
        }
    };
    const clearAll = () => {
        setOrderState(INITIAL_ORDER);
        setWhere(null);
    };
    const clearOrder = () => {
        setOrderState(INITIAL_ORDER);
    };

    return (
        <Template title="User signals" width={width} page={PageType.userSignals} hideToolbar>
            {data?.user_signals?.length && aggrData?.user_signals_aggregate ? (
                <Table columns={REACT_TABLE_COLUMNS} data={rtUserSignalsFormat(data.user_signals)} />
            ) : null}
        </Template>
    );
};

export default ManageUserSignals;
