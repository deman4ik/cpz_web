import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
// components
import { Template } from "components/layout/Template";
import SearchTable from "components/basic/SearchTable";
import { Modal } from "components/basic";
import OrderModalInner from "../common/OrderModalInner";
import SearchPanel from "../common/SearchPanel";
import { LoadingIndicator } from "components/common";
// hooks
import useWindowDimensions from "hooks/useWindowDimensions";
// constants
import { COLUMNS_WIDTH, TABLE_HEADER_DATA } from "./constants";
import { POLL_INTERVAL } from "config/constants";
import { INITIAL_ORDER, SORT_SETTINGS, FILTERS_SCHEME } from "./Order.settings";
import { PageType } from "config/types";
// utils
import { aggregateRobotsFilters, formatRobotsRows, getSearchWhere } from "./utils";
import { formatFilters } from "../common/OrderModalInner/utils";
//graphql
import { GET_USER_ROBOTS, USER_ROBOTS_AGGREGATE, GET_USER_ROBOTS_STATS } from "graphql/manage/queries";

const LIMIT_STEP = 10;

const ManageUserRobots = () => {
    /*states*/
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [where, setWhere] = useState(null);
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
        variables: { where: whereData },
        pollInterval: POLL_INTERVAL
    });

    const { data: statsData, loading } = useQuery(GET_USER_ROBOTS_STATS);

    /*Filters change*/
    useEffect(() => {
        if (statsData?.stats && !orderState?.filters) {
            const formatedFilters = formatFilters(FILTERS_SCHEME, statsData.stats);
            setOrderState({ ...orderState, filters: formatedFilters });
        }
    }, [orderState, orderState?.filters, statsData, statsData?.stats]);

    /*handlers*/
    const searchCallback = (value) => {
        const trimedVal = value.trim();
        if (trimedVal) {
            setWhere(getSearchWhere(trimedVal));
            setLimit(aggrData.user_robots_aggregate.aggregate.count);
        } else {
            setWhere(null);
            setLimit(LIMIT_STEP);
        }
    };
    const setOpenModal = () => setIsOpenModal((prev) => !prev);
    const callbackMore = () => {
        setLimit(data.user_robots.length + LIMIT_STEP);
    };
    const clearAll = () => {
        setOrderState(INITIAL_ORDER);
        setWhere(null);
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
            hideToolbar
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
                        handleFetchMore: callbackMore
                    }}
                />
            ) : null}
            <Modal isOpen={isOpenModal} title="Filter User Robots" onClose={setOpenModal}>
                {loading ? (
                    <LoadingIndicator />
                ) : (
                    <OrderModalInner
                        orderState={orderState}
                        setOrderState={setOrderState}
                        closeModal={setOpenModal}
                        clearOrder={clearOrder}
                        sortSettings={SORT_SETTINGS}
                    />
                )}
            </Modal>
        </Template>
    );
};

export default ManageUserRobots;
