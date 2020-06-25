import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
// hooks
import useWindowDimensions from "hooks/useWindowDimensions";
// components
import { Template } from "components/layout/Template";
import SearchTable from "components/basic/SearchTable";
import SearchPanel from "../common/SearchPanel";
// utils
import { getWhereVariables, formatUsers } from "./utils";
// constants
import { HEADER_TABLE_DATA, COLUMNS_WIDTH } from "./constants";
import { POLL_INTERVAL } from "config/constants";
// graphql
import { GET_USERS, USERS_AGGREGATE } from "graphql/manage/queries";

const LIMIT_STEP = 10; // шаг пагинации

const ManageUsers = () => {
    /*States*/
    const [limit, setLimit] = useState(LIMIT_STEP);
    const [isSearch, setIsSearch] = useState(false);
    const [filters, setFilters] = useState(getWhereVariables(""));

    const { width } = useWindowDimensions(); // width hook

    /*Fetch data*/
    const { data } = useQuery(GET_USERS, {
        variables: { where: filters, limit }
    });
    const { data: aggrData } = useQuery(USERS_AGGREGATE, {
        pollInterval: POLL_INTERVAL
    });

    /*Handlers*/
    const searchCallback = (value) => {
        setFilters(getWhereVariables(value));
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

    return (
        <Template title="Users" width={width} toolbar={<SearchPanel callback={searchCallback} />}>
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
        </Template>
    );
};

export default ManageUsers;
