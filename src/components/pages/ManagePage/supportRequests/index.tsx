/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
// hooks
import useWindowDimensions from "hooks/useWindowDimensions";
// components
import { Template } from "components/layout/Template";
import UsersChats from "./components/UsersChats";
import SearchPanel from "../common/SearchPanel";
import OrderModalInner from "../common/OrderModalInner";
import { Modal } from "components/basic";
// constants
import { POLL_INTERVAL } from "config/constants";
import { INITIAL_ORDER, SORT_SETTINGS } from "./Order.settings";
// graphql
import { GET_USERS_SUPPORT_REQUESTS } from "graphql/manage/queries";
// utils
import { formatUsersSupportRequests, getSearchParams } from "./utils";
// types
import { PageType } from "config/types";

const ManageSupportRequests = () => {
    /*states*/
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [orderState, setOrderState] = useState(INITIAL_ORDER);
    const [search, setSearch] = useState(null);
    /*hooks*/
    const { width } = useWindowDimensions(); // width hook
    /*обработки условий для поиска и фетчинга данных*/
    let _and = [
        {
            _or: [{ messages: { to: { _is_null: true } } }, { messagesByTo: {} }]
        }
    ];
    if (search) _and = [..._and, { ...search }];

    // fetch data
    const { data } = useQuery(GET_USERS_SUPPORT_REQUESTS, {
        variables: {
            where: { _and }
        },
        pollInterval: POLL_INTERVAL
    });
    /*handlers*/
    const searchCallback = (value) => {
        const trimedVal = value.trim();
        if (trimedVal) {
            setSearch(getSearchParams(trimedVal));
        } else {
            setSearch(null);
        }
    };
    const setOpenModal = () => setIsOpenModal((prev) => !prev);
    const clearOrder = () => {
        setOrderState(INITIAL_ORDER);
        setOpenModal();
    };
    const clearAll = () => {
        setOrderState(INITIAL_ORDER);
        setSearch(null);
    };

    return (
        <Template
            title="Support Requests"
            width={width}
            hideToolbar
            page={PageType.supportRequests}
            toolbar={
                <SearchPanel
                    callback={searchCallback}
                    placeholder="Search users"
                    clear={clearAll}
                    orderTitle="Sort"
                    setOpenModal={setOpenModal}
                />
            }>
            {data?.support_requests?.length && (
                <UsersChats data={formatUsersSupportRequests(data.support_requests, orderState.sort.order_by)} />
            )}
            <Modal isOpen={isOpenModal} title="Sort  Users Requests" onClose={setOpenModal}>
                <OrderModalInner
                    setOrderState={setOrderState}
                    orderState={orderState}
                    closeModal={setOpenModal}
                    clearOrder={clearOrder}
                    sortSettings={SORT_SETTINGS}
                />
            </Modal>
        </Template>
    );
};

export default ManageSupportRequests;
