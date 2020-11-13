/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import React from "react";

// components
import ManagePageTemplate from "../common/ManagePageTemplate";

// utils
import { formatRobots, getSearchOptions } from "./utils";

// constants
import { ROBOT_TABLE_COLUMNS } from "./constants";
import { PageType } from "config/types";

//graphql
import { ALL_ROBOTS, ALL_ROBOTS_AGGREGATE } from "graphql/manage/queries";

const ManageRobots: React.FC = () => {
    const getItemsCount = (data) => data.robots_aggregate?.aggregate?.count;
    return (
        <ManagePageTemplate
            pageType={PageType.manageRobots}
            columns={ROBOT_TABLE_COLUMNS}
            dataQuery={ALL_ROBOTS}
            aggregateQuery={ALL_ROBOTS_AGGREGATE}
            formatData={formatRobots}
            getItemsCount={getItemsCount}
            getSearchOptions={getSearchOptions}
        />
    );
};

export default ManageRobots;
