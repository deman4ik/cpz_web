/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import React from "react";

// components
import ManagePageTemplate from "../common/ManagePageTemplate";

// constants
import { PageType } from "config/types";
import { BACKTESTS_TABLE_COLUMNS } from "components/pages/ManagePage/backtests/constants";

//graphql
import { BACKTESTS, BACKTESTS_AGGREGATE } from "graphql/manage/queries";
import { formatBackTestsData } from "components/pages/ManagePage/backtests/utils";

const getSearchOptions = (query: string) => {
    const queryIsNotEmpty = query && query.trim();
    if (queryIsNotEmpty) {
        return { robot: { code: { _ilike: `%${query}%` } } };
    }
    return null;
};
const getItemsCount = (data) => data.backtests_aggregate?.aggregate?.count;

const ManageBackTests: React.FC = () => {
    return (
        <ManagePageTemplate
            pageType={PageType.manageBacktests}
            columns={BACKTESTS_TABLE_COLUMNS}
            dataQuery={BACKTESTS}
            aggregateQuery={BACKTESTS_AGGREGATE}
            formatData={formatBackTestsData}
            getItemsCount={getItemsCount}
            getSearchOptions={getSearchOptions}
        />
    );
};

export default ManageBackTests;
