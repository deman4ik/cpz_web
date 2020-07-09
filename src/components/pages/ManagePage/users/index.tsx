import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
// hooks
import useWindowDimensions from "hooks/useWindowDimensions";
// components
import { Template } from "components/layout/Template";
import SearchTable from "components/basic/SearchTable";
import SearchPanel from "../common/SearchPanel";
import UserFilters from "./components/UserFilters";
import { Modal } from "components/basic";
// utils
import { formatUsers, getWhereVariables } from "./utils";
// constants
import { COLUMNS_WIDTH, HEADER_TABLE_DATA, INITIAL_FILTERS } from "./constants";
import { POLL_INTERVAL } from "config/constants";
import { PageType } from "config/types";
// graphql
import { GET_USERS, USERS_AGGREGATE } from "graphql/manage/queries";

const LIMIT_STEP = 10; // шаг пагинации

const ManageUsers = () => {
    /*States*/
    const [isOpenModal, setIsOpenModal] = useState(true);
    const [limit, setLimit] = useState(LIMIT_STEP);
    const [isSearch, setIsSearch] = useState(false);
    const [where, setWhere] = useState(getWhereVariables(""));
    const [filtersState, setFiltersState] = useState(INITIAL_FILTERS);
    const { width } = useWindowDimensions(); // width hook

    /*Fetch data*/
    const {
        order: { order_by }
    } = filtersState; // filters data
    // const whereData = whereFilters ? { ...where, ...whereFilters } : where;  TODO: добавление фильтрпов
    const { data } = useQuery(GET_USERS, {
        variables: { where, limit, order_by }
    });
    const { data: aggrData } = useQuery(USERS_AGGREGATE, {
        pollInterval: POLL_INTERVAL
    });

    /*Handlers*/
    const searchCallback = (value) => {
        setWhere(getWhereVariables(value));
        if (value) {
            setLimit(aggrData.users_aggregate.aggregate.count);
        } else {
            setLimit(LIMIT_STEP);
        }
        setIsSearch(Boolean(value));
    };
    const callbackMore = () => {
        setLimit(data.users.length + LIMIT_STEP);
    };
    const setOpenModal = () => setIsOpenModal((prev) => !prev);

    return (
        <Template
            title="Users"
            width={width}
            toolbar={<SearchPanel callback={searchCallback} setOpenModal={setOpenModal} />}
            page={PageType.users}>
            {data?.users?.length && aggrData?.users_aggregate?.aggregate ? (
                <SearchTable
                    headerData={HEADER_TABLE_DATA}
                    columnsWidth={COLUMNS_WIDTH}
                    tableRows={formatUsers(data.users)}
                    moreButton={{
                        limitStep: LIMIT_STEP,
                        maxCount: aggrData.users_aggregate.aggregate.count,
                        handleFetchMore: callbackMore,
                        isSearch
                    }}
                />
            ) : null}
            <Modal isOpen={isOpenModal} title="Filter Users Search" onClose={setOpenModal}>
                <UserFilters filtersState={filtersState} setFiltersState={setFiltersState} closeModal={setOpenModal} />
            </Modal>
        </Template>
    );
};

export default ManageUsers;
