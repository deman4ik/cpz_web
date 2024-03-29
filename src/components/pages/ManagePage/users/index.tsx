/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import React from "react";

import ManagePageTemplate from "../common/ManagePageTemplate";
// utils
import { formatData, getSearchOptions } from "./utils";
// constants
import { USERS_TABLE_COLUMNS } from "./constants";
import { PageType } from "config/types";
// graphql
import { ALL_USERS, ALL_USERS_AGGREGATE } from "graphql/manage/queries";

const ManageUsers = () => {
    const getItemsCount = (data) => data?.users_aggregate?.aggregate?.count || 0;

    return (
        <ManagePageTemplate
            pageType={PageType.users}
            columns={USERS_TABLE_COLUMNS}
            dataQuery={ALL_USERS}
            aggregateQuery={ALL_USERS_AGGREGATE}
            formatData={formatData}
            getItemsCount={getItemsCount}
            getSearchOptions={getSearchOptions}
        />
    );
};

export default ManageUsers;
