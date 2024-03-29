/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import React from "react";

// components
import ManagePageTemplate from "../common/ManagePageTemplate";

// utils
import { formatUserRobots, getSearchOptions } from "./utils";

// constants
import { USER_ROBOTS_TABLE_COLUMNS } from "./constants";
import { PageType } from "config/types";

//graphql
import { ALL_USER_ROBOTS, USER_ROBOTS_AGGREGATE } from "graphql/manage/queries";

const ManageUserRobots = () => {
    // const robotFilters = aggregateRobotsFilters(filters);
    // const whereData = robotFilters ? { ...where, robot: robotFilters } : where;

    const getItemsCount = (data) => data?.user_robots_aggregate?.aggregate?.count || 0;

    return (
        <ManagePageTemplate
            pageType={PageType.userRobots}
            columns={USER_ROBOTS_TABLE_COLUMNS}
            dataQuery={ALL_USER_ROBOTS}
            aggregateQuery={USER_ROBOTS_AGGREGATE}
            formatData={formatUserRobots}
            getItemsCount={getItemsCount}
            getSearchOptions={getSearchOptions}
        />
    );
};

export default ManageUserRobots;
