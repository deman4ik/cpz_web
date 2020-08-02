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
    const [where, setWhere] = useState(null);

    // fetch data
    const { data } = useQuery(GET_USERS_SUPPORT_REQUESTS, {
        variables: { where: { messages: {}, ...where } },
        pollInterval: POLL_INTERVAL
    });

    const searchCallback = (value) => {
        const trimedVal = value.trim();
        if (trimedVal) {
            setWhere(getSearchParams(trimedVal));
        } else {
            setWhere(null);
        }
    };

    const clearAll = () => {
        setWhere(null);
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
