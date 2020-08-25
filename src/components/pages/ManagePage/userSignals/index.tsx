/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
// components
import { Template } from "components/layout/Template";
import Table from "components/basic/Table";
import { Modal } from "components/basic";
import OrderModalInner from "../common/OrderModalInner";
import SearchPanel from "../common/SearchPanel";
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

const LIMIT_STEP = 10;

const ManageUserSignals = () => {
    /*States*/
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [limit, setLimit] = useState(LIMIT_STEP);
    const [orderState, setOrderState] = useState(INITIAL_ORDER);
    const { width } = useWindowDimensions(); // width hook
    const [where, setWhere] = useState(getSearchWhere(""));

    const {
        sort: { order_by }
    } = orderState;
    /*Fetch data*/
    const { data } = useQuery(GET_USER_SIGNALS, {
        variables: { limit, where, order_by }
    });

    const { data: aggrData } = useQuery(USER_SIGNALS_AGGREGATE, {
        variables: { where },
        pollInterval: POLL_INTERVAL
    });

    /*handlers*/
    const toggleModal = () => setIsModalVisible((prev) => !prev);
    const callbackMore = () => {
        setLimit(data.user_signals.length + LIMIT_STEP);
    };
    const searchCallback = (value) => {
        const trimedVal = value.trim();
        if (trimedVal) {
            setWhere(getSearchWhere(trimedVal));
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
        toggleModal();
    };

    return (
        <Template
            title="User signals"
            width={width}
            page={PageType.userSignals}
            hideToolbar
            toolbar={<SearchPanel callback={searchCallback} setOpenModal={toggleModal} clear={clearAll} />}>
            {data?.user_signals?.length && aggrData?.user_signals_aggregate ? (
                <Table
                    columnsWidth={COLUMNS_WIDTH}
                    columns={REACT_TABLE_COLUMNS}
                    data={rtUserSignalsFormat(data.user_signals)}
                    loadButton={{
                        limitStep: 10,
                        maxCount: aggrData.user_signals_aggregate.aggregate.count,
                        handleFetchMore: callbackMore
                    }}
                />
            ) : null}
            <Modal isOpen={isModalVisible} title="Filter User Signals" onClose={toggleModal}>
                <OrderModalInner
                    orderState={orderState}
                    setOrderState={setOrderState}
                    closeModal={toggleModal}
                    clearOrder={clearOrder}
                    sortSettings={SORT_SETTINGS}
                />
            </Modal>
        </Template>
    );
};

export default ManageUserSignals;
