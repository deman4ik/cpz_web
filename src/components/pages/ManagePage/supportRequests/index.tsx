/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import React from "react";
// graphql
import { SUPPORT_REQUESTS, SUPPORT_REQUESTS_AGGREGATE } from "graphql/manage/queries";
// utils
import { formatUsersSupportRequests, getSearchParams, getItemsCount } from "./utils";
// types
import { PageType } from "config/types";
import ManagePageTemplate from "../common/ManagePageTemplate";
import { USER_REQUESTS_TABLE_COLUMNS } from "./constants";

const ManageSupportRequests = () => {
    return (
        <ManagePageTemplate
            pageType={PageType.supportRequests}
            columns={USER_REQUESTS_TABLE_COLUMNS}
            dataQuery={SUPPORT_REQUESTS}
            aggregateQuery={SUPPORT_REQUESTS_AGGREGATE}
            formatData={formatUsersSupportRequests}
            getSearchOptions={getSearchParams}
            getItemsCount={getItemsCount}
        />
    );
};

export default ManageSupportRequests;
