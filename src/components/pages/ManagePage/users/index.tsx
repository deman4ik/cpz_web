import React, { useState } from "react";
import { useQuery } from "@apollo/client";
// hooks
import useWindowDimensions from "hooks/useWindowDimensions";
// components
import { Template } from "components/layout/Template";
import SearchTable from "components/basic/SearchTable";
import SearchPanel from "../common/SearchPanel";
import OrderModalInner from "../common/OrderModalInner";
import { Modal } from "components/basic";
// utils
import { formatUsers, getWhereVariables } from "./utils";
import { aggregateOrderModalFilters } from "../common/OrderModalInner/utils";
import { INITIAL_ORDER, SORT_SETTINGS } from "./Order.settings";
// constants
import { COLUMNS_WIDTH, HEADER_TABLE_DATA } from "./constants";
import { POLL_INTERVAL } from "config/constants";
import { PageType } from "config/types";
// graphql
import { GET_USERS, USERS_AGGREGATE } from "graphql/manage/queries";

const LIMIT_STEP = 10; // шаг пагинации

const ManageUsers = () => {
    /*States*/
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [limit, setLimit] = useState(LIMIT_STEP);
    const [where, setWhere] = useState(null);
    const [orderState, setOrderState] = useState(INITIAL_ORDER);
    const { width } = useWindowDimensions(); // width hook

    /*aggregate filters and  sort*/
    const {
        sort: { order_by },
        filters
    } = orderState;
    const filtersWhere = aggregateOrderModalFilters(filters);
    const whereData = filtersWhere ? { ...where, ...filtersWhere } : where;

    /*Fetch data*/
    const { data } = useQuery(GET_USERS, {
        variables: { where: whereData, limit, order_by }
    });
    const { data: aggrData } = useQuery(USERS_AGGREGATE, {
        variables: { where: whereData },
        pollInterval: POLL_INTERVAL
    });

    /*Handlers*/
    const searchCallback = (value) => {
        const trimedVal = value.trim();
        if (trimedVal) {
            setWhere(getWhereVariables(trimedVal));
            setLimit(aggrData.users_aggregate.aggregate.count);
        } else {
            setWhere(null);
            setLimit(LIMIT_STEP);
        }
    };
    const callbackMore = () => {
        setLimit(data.users.length + LIMIT_STEP);
    };
    const setOpenModal = () => setIsOpenModal((prev) => !prev);
    const clearOrder = () => {
        setOrderState(INITIAL_ORDER);
        setOpenModal();
    };
    const clearAll = () => {
        setOrderState(INITIAL_ORDER);
        setWhere(null);
    };

    return (
        <Template
            title="Users"
            width={width}
            toolbar={
                <SearchPanel
                    callback={searchCallback}
                    setOpenModal={setOpenModal}
                    placeholder="Search users..."
                    clear={clearAll}
                />
            }
            hideToolbar
            page={PageType.users}>
            {data?.users?.length && aggrData?.users_aggregate?.aggregate?.count ? (
                <SearchTable
                    headerData={HEADER_TABLE_DATA}
                    columnsWidth={COLUMNS_WIDTH}
                    tableRows={formatUsers(data.users)}
                    moreButton={{
                        limitStep: LIMIT_STEP,
                        maxCount: aggrData?.users_aggregate?.aggregate?.count,
                        handleFetchMore: callbackMore
                    }}
                />
            ) : null}
            <Modal isOpen={isOpenModal} title="Filter Users Search" onClose={setOpenModal}>
                <OrderModalInner
                    orderState={orderState}
                    setOrderState={setOrderState}
                    closeModal={setOpenModal}
                    clearOrder={clearOrder}
                    sortSettings={SORT_SETTINGS}
                />
            </Modal>
        </Template>
    );
};

export default ManageUsers;
