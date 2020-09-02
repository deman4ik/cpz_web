/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import React from "react";

// components
import ManagePageTemplate from "../common/ManagePageTemplate";

// utils
import { formatData, getSearchOptions } from "./utils";

// constants
import { TABLE_DATA_COLUMNS } from "./constants";
import { PageType } from "config/types";

//graphql
import { GET_USER_ROBOTS, USER_ROBOTS_AGGREGATE } from "graphql/manage/queries";

const ManageUserRobots = () => {
    // const robotFilters = aggregateRobotsFilters(filters);
    // const whereData = robotFilters ? { ...where, robot: robotFilters } : where;

    const getItemsCount = (data) => data?.user_robots_aggregate?.aggregate?.count || 0;

    return (
        <ManagePageTemplate
            pageType={PageType.userRobots}
            columns={REACT_TABLE_COLUMNS}
            dataQuery={GET_USER_ROBOTS}
            aggregateQuery={USER_ROBOTS_AGGREGATE}
            formatData={formatUsersSignals}
            getItemsCount={getItemsCount}
            getSearchOptions={getSearchOptions}
        />
    );
};

export default ManageUserRobots;
