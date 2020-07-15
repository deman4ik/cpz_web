import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
// components
import { Template } from "components/layout/Template";
import SearchTable from "components/basic/SearchTable";
import { Modal } from "components/basic";
import OrderModalInner from "../common/OrderModalInner";
import SearchPanel from "../common/SearchPanel";
// hooks
import useWindowDimensions from "hooks/useWindowDimensions";
// constants
import { COLUMNS_WIDTH, TABLE_HEADER_DATA } from "./constants";
import { POLL_INTERVAL } from "config/constants";
import { INITIAL_ORDER, SORT_SETTINGS } from "./Order.settings";
import { PageType } from "config/types";
// utils
import { aggregateRobotsFilters, formatRobotsRows, getSearchWhere } from "./utils";
//graphql
import { GET_USER_ROBOTS, USER_ROBOTS_AGGREGATE } from "graphql/manage/queries";

const LIMIT_STEP = 10;

const ManageUserRobots = () => {
    /*states*/
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [where, setWhere] = useState(getSearchWhere(""));
    const [orderState, setOrderState] = useState(INITIAL_ORDER);
    const [limit, setLimit] = useState(LIMIT_STEP);
    const { width } = useWindowDimensions(); // width hook

    const {
        sort: { order_by },
        filters
    } = orderState;
    const robotFilters = aggregateRobotsFilters(filters);
    const whereData = robotFilters ? { ...where, robot: robotFilters } : where;

    /*Fetch data*/
    const { data } = useQuery(GET_USER_ROBOTS, {
        variables: { limit, where: whereData, order_by }
    });

    const { data: aggrData } = useQuery(USER_ROBOTS_AGGREGATE, {
        pollInterval: POLL_INTERVAL
    });

    /*handlers*/
    const searchCallback = (value) => {
        setWhere(getSearchWhere(value));
        if (value) {
            setLimit(aggrData.user_robots_aggregate.aggregate.count);
        } else {
            setLimit(LIMIT_STEP);
        }
        setIsSearch(Boolean(value));
    };
    const setOpenModal = () => setIsOpenModal((prev) => !prev);
    const callbackMore = () => {
        setLimit(data.user_robots.length + LIMIT_STEP);
    };
    const clearAll = () => {
        setWhere(getSearchWhere(""));
    };
    const clearOrder = () => {
        setOrderState(INITIAL_ORDER);
        setOpenModal();
    };

    return (
        <Template
            title="User robots"
            width={width}
            page={PageType.userRobots}
            toolbar={
                <SearchPanel
                    callback={searchCallback}
                    setOpenModal={setOpenModal}
                    placeholder="Search users..."
                    clear={clearAll}
                />
            }>
            {data?.user_robots?.length && aggrData?.user_robots_aggregate?.aggregate ? (
                <SearchTable
                    columnsWidth={COLUMNS_WIDTH}
                    headerData={TABLE_HEADER_DATA}
                    tableRows={formatRobotsRows(data.user_robots)}
                    moreButton={{
                        limitStep: LIMIT_STEP,
                        maxCount: aggrData.user_robots_aggregate.aggregate.count,
                        handleFetchMore: callbackMore,
                        isSearch
                    }}
                />
            ) : null}
            <Modal isOpen={isOpenModal} title="Filter User Robots" onClose={setOpenModal}>
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

export default ManageUserRobots;
