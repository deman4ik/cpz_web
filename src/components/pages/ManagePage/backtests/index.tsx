/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import React, { useCallback, useEffect, useState } from "react";

// components
import ManagePageTemplate from "../common/ManagePageTemplate";

// constants
import { PageType } from "config/types";
import { BACKTESTS_TABLE_COLUMNS } from "components/pages/ManagePage/backtests/constants";

//graphql
import { GET_ROBOT_NAMES_BY_ID, BACKTESTS, BACKTESTS_AGGREGATE } from "graphql/manage/queries";
import { formatBackTestsData } from "components/pages/ManagePage/backtests/utils";
import { useLazyQuery } from "@apollo/client";

const ManageBackTests: React.FC = () => {
    const getItemsCount = (data) => data.backtests_aggregate?.aggregate?.count;

    const [robotIds, setRobotIds] = useState(null);
    const [getData, { data, loading }] = useLazyQuery(GET_ROBOT_NAMES_BY_ID, {
        variables: {
            where: {
                id: { _in: robotIds }
            }
        }
    });
    useEffect(() => {
        if (robotIds && robotIds.length) {
            getData();
        }
    }, [getData, robotIds]);

    const getNameFromData = (robot_id) => {
        const robot = data.robots.find((_robot) => _robot.id === robot_id);
        if (robot) return robot.name;
        return "";
    };

    const getSearchOptions = (query: string) => {
        if (data) {
            const matches = data.robots.filter((robot) => {
                const name = robot.name.toLowerCase();
                const queryStr = query.toLowerCase();
                return name.includes(queryStr);
            });
            const thereAreMatches = matches && matches.length;
            if (thereAreMatches) {
                return { id: { _in: matches.map((i) => i.id) } };
            }
        }
        return null;
    };

    const formatAndFillNames = useCallback(
        (backtests) => {
            const formattedData = formatBackTestsData(backtests);
            setRobotIds(formattedData.map((b) => b.id));
            if (data && !loading) {
                return formattedData.map((item) => ({
                    ...item,
                    name: getNameFromData(item.robot_id)
                }));
            }
            return formattedData;
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [loading, data]
    );
    return (
        <ManagePageTemplate
            pageType={PageType.manageBacktests}
            columns={BACKTESTS_TABLE_COLUMNS}
            dataQuery={BACKTESTS}
            aggregateQuery={BACKTESTS_AGGREGATE}
            formatData={formatAndFillNames}
            getItemsCount={getItemsCount}
            getSearchOptions={getSearchOptions}
        />
    );
};

export default ManageBackTests;
