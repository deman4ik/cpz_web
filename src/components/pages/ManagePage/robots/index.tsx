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
import { ROBOTS_TABLE_HEADER_DATA, COLUMNS_WIDTH } from "./constants";
import { INITIAL_ORDER, SORT_SETTINGS, FILTERS_SCHEME } from "./Order.settings";
import { PageType } from "config/types";
//graphql
import { GET_ROBOTS, ROBOTS_AGGREGATE, GET_ROBOTS_STATS } from "graphql/manage/queries";
// utils
import { formatRobotsRows, getWhereSearch, aggregateRobotsFilters } from "./utils";
import { POLL_INTERVAL } from "config/constants";
import { formatFilters } from "../common/OrderModalInner/utils";

const LIMIT_STEP = 10;

const ManageRobots = () => {
    /*States*/
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [limit, setLimit] = useState(LIMIT_STEP);
    const [where, setWhere] = useState(getWhereSearch(""));
    const [orderState, setOrderState] = useState(INITIAL_ORDER);
    const { width } = useWindowDimensions(); // width hook

    const {
        sort: { order_by },
        filters
    } = orderState;
    const filtersWhere = aggregateRobotsFilters(filters);
    /*fetch data*/
    const whereData = filtersWhere ? { ...where, ...filtersWhere } : where;
    const { data } = useQuery(GET_ROBOTS, {
        variables: { limit, where: whereData, order_by }
    });
    const { data: aggrData } = useQuery(ROBOTS_AGGREGATE, {
        variables: { where: whereData },
        pollInterval: POLL_INTERVAL
    });
    const { data: statsData, loading } = useQuery(GET_ROBOTS_STATS);

    /*Filters change*/
    useEffect(() => {
        if (statsData?.stats && !orderState?.filters) {
            const formatedFilters = formatFilters(FILTERS_SCHEME, statsData.stats);
            setOrderState({ ...orderState, filters: formatedFilters });
        }
    }, [orderState, orderState?.filters, statsData, statsData?.stats]);

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
    };
    const clearAll = () => {
        setWhere(getWhereSearch(""));
        setOrderState(INITIAL_ORDER);
    };
    const clearOrder = () => {
        setOrderState(INITIAL_ORDER);
        setOpenModal();
    };

    return (
        <Template
            title="Robots"
            width={width}
            page={PageType.manageRobots}
            toolbar={
                <SearchPanel
                    callback={searchCallback}
                    setOpenModal={setOpenModal}
                    placeholder="Search robots..."
                    clear={clearAll}
                />
            }>
            {data?.robots?.length && aggrData?.robots_aggregate?.aggregate ? (
                <SearchTable
                    columnsWidth={COLUMNS_WIDTH}
                    headerData={ROBOTS_TABLE_HEADER_DATA}
                    tableRows={formatRobotsRows(data.robots)}
                    moreButton={{
                        limitStep: LIMIT_STEP,
                        maxCount: aggrData.robots_aggregate.aggregate.count,
                        handleFetchMore: callbackMore
                    }}
                />
            ) : null}
            <Modal isOpen={isOpenModal} title="Filter Robots Search" onClose={setOpenModal}>
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

export default ManageRobots;
