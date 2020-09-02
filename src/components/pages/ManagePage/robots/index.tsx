/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import React from "react";

// components
import ManagePageTemplate from "../common/ManagePageTemplate";

// utils
import { formatData, getSearchOptions } from "./utils";

// constants
import { ROBOT_TABLE_COLUMNS } from "./constants";
import { PageType } from "config/types";

//graphql
import { GET_ROBOTS, ROBOTS_AGGREGATE } from "graphql/manage/queries";

const ManageRobots: React.FC = () => {
    const getItemsCount = (data) => data.robots_aggregate.aggregate.count;

    return (
        <ManagePageTemplate
            pageType={PageType.userRobots}
            columns={TABLE_COLUMNS}
            dataQuery={GET_ROBOTS}
            aggregateQuery={ROBOTS_AGGREGATE}
            formatData={formatData}
            getItemsCount={getItemsCount}
            getSearchOptions={getSearchOptions}
        />
    );
};

export default ManageRobots;
