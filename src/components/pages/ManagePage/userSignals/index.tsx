/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import React from "react";
// components
import ManagePageTemplate from "../common/ManagePageTemplate";
// utils
import { formatUsersSignals, getSearchOptions } from "./utils";
// constants
import { REACT_TABLE_COLUMNS } from "./constants";
import { PageType } from "config/types";
//graphql
import { GET_USER_SIGNALS, USER_SIGNALS_AGGREGATE } from "graphql/manage/queries";

const ManageUserSignals = () => {
    const getItemsCount = (data) => data?.user_signals_aggregate?.aggregate?.count;

    return (
        <ManagePageTemplate
            pageType={PageType.userSignals}
            columns={REACT_TABLE_COLUMNS}
            dataQuery={GET_USER_SIGNALS}
            aggregateQuery={USER_SIGNALS_AGGREGATE}
            formatData={formatUsersSignals}
            getItemsCount={getItemsCount}
            getSearchOptions={getSearchOptions}
        />
    );
};

export default ManageUserSignals;
