import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
// hooks
import useWindowDimensions from "hooks/useWindowDimensions";
// components
import { Template } from "components/layout/Template";
import UsersChats from "./components/UsersChats";
import SearchPanel from "../common/SearchPanel";
// constants
import { POLL_INTERVAL } from "config/constants";
// graphql
import { GET_USERS_SUPPORT_REQUESTS } from "graphql/manage/queries";
// utils
import { formatUsersSupportRequests, getSearchParams } from "./utils";
// types
import { PageType } from "config/types";

const ManageSupportRequests = () => {
    const { width } = useWindowDimensions(); // width hook
    const [search, setSearch] = useState(null);
    let _and = [
        {
            _or: [{ messages: {} }, { messagesByTo: {} }]
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

    const searchCallback = (value) => {
        const trimedVal = value.trim();
        if (trimedVal) {
            setSearch(getSearchParams(trimedVal));
        } else {
            setSearch(null);
        }
    };

    const clearAll = () => {
        setSearch(null);
    };

    return (
        <Template
            title="Support Requests"
            width={width}
            page={PageType.supportRequests}
            toolbar={<SearchPanel callback={searchCallback} placeholder="Search users" clear={clearAll} />}>
            {data?.support_requests?.length && <UsersChats data={formatUsersSupportRequests(data.support_requests)} />}
        </Template>
    );
};

export default ManageSupportRequests;
