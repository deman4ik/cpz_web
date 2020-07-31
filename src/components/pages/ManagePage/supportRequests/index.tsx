import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
// hooks
import useWindowDimensions from "hooks/useWindowDimensions";
// components
import { Template } from "components/layout/Template";
import UsersChats from "./components/UsersChats";
// constants
import { POLL_INTERVAL } from "config/constants";
// graphql
import { GET_USERS_SUPPORT_REQUESTS } from "graphql/manage/queries";
// utils
import { formatUsersSupportRequests } from "./utils";

const ManageSupportRequests = () => {
    const { width } = useWindowDimensions(); // width hook

    // fetch data
    const { data } = useQuery(GET_USERS_SUPPORT_REQUESTS, {
        pollInterval: POLL_INTERVAL
    });

    return (
        <Template title="Support Requests" width={width}>
            {data?.support_requests?.length && <UsersChats data={formatUsersSupportRequests(data.support_requests)} />}
        </Template>
    );
};

export default ManageSupportRequests;
