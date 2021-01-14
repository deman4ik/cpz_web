import React from "react";

// components
import ManagePageTemplate from "../common/ManagePageTemplate";

// utils
import { formatSignals, getSearchOptions } from "./utils";

// constants
import { USER_SIGNALS_TABLE_COLUMNS } from "./constants";
import { PageType } from "config/types";

//graphql
import { ALL_USER_SIGNALS, USER_SIGNALS_AGGREGATE } from "graphql/manage/queries";

const ManageUserSignals: React.FC = () => {
    const getItemsCount = (data) => data?.user_signals_aggregate?.aggregate?.count || 0;

    return (
        <ManagePageTemplate
            pageType={PageType.userSignals}
            columns={USER_SIGNALS_TABLE_COLUMNS}
            dataQuery={ALL_USER_SIGNALS}
            aggregateQuery={USER_SIGNALS_AGGREGATE}
            formatData={formatSignals}
            getItemsCount={getItemsCount}
            getSearchOptions={getSearchOptions}
        />
    );
};

export default ManageUserSignals;
