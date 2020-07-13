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
import { ROBOTS_TABLE_HEADER_DATA, COLUMNS_WIDTH } from "./constants";
import { INITIAL_ORDER, SORT_SETTINGS } from "./Order.settings";
//graphql
import { GET_ROBOTS, ROBOTS_AGGREGATE } from "graphql/manage/queries";
// utils
import { formatRobotsRows, getWhereSearch } from "./utils";
import { aggregateOrderModalFilters } from "../common/OrderModalInner/utils";
import { POLL_INTERVAL } from "config/constants";

const LIMIT_STEP = 10;

const ManageRobots = () => {
    /*States*/
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [limit, setLimit] = useState(LIMIT_STEP);
    const [isSearch, setIsSearch] = useState(false);
    const [where, setWhere] = useState(getWhereSearch(""));
    const [orderState, setOrderState] = useState(INITIAL_ORDER);
    const { width } = useWindowDimensions(); // width hook

    const {
        sort: { order_by },
        filters
    } = orderState;
    const filtersWhere = aggregateOrderModalFilters(filters);

    /*fetch data*/
    const whereData = filtersWhere ? { ...where, ...filtersWhere } : where;
    const { data } = useQuery(GET_ROBOTS, {
        variables: { limit, where: whereData, order_by }
    });
    const { data: aggrData } = useQuery(ROBOTS_AGGREGATE, {
        pollInterval: POLL_INTERVAL
    });

    /*handlers*/
    const setOpenModal = () => setIsOpenModal((prev) => !prev);
    const callbackMore = () => {
        setLimit(data.robots.length + LIMIT_STEP);
    };
    const searchCallback = (value) => {
        setWhere(getWhereSearch(value));
        if (value) {
            setLimit(aggrData.robots_aggregate.aggregate.count);
        } else {
            setLimit(LIMIT_STEP);
        }
        setIsSearch(Boolean(value));
    };
    const clearAll = () => {
        setWhere(getWhereSearch(""));
    };
    const clearOrder = () => {
        setOrderState(INITIAL_ORDER);
    };

    return (
        <Template
            title="Robots"
            width={width}
            toolbar={
                <SearchPanel
                    callback={searchCallback}
                    setOpenModal={setOpenModal}
                    placeholder="Search robots..."
                    clear={clearAll}
                />
            }>
            {data?.robots?.length && (
                <SearchTable
                    columnsWidth={COLUMNS_WIDTH}
                    headerData={ROBOTS_TABLE_HEADER_DATA}
                    tableRows={formatRobotsRows(data.robots)}
                    moreButton={{
                        limitStep: LIMIT_STEP,
                        maxCount: 88,
                        handleFetchMore: callbackMore,
                        isSearch
                    }}
                />
            )}
            <Modal isOpen={isOpenModal} title="Filter Robots Search" onClose={setOpenModal}>
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

export default ManageRobots;
