/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import React, { useState } from "react";

// components

// constants
import { PageType } from "config/types";
import { BACKTEST_ITEM_TABLE_COLUMNS, BACKTESTS_TABLE_COLUMNS } from "components/pages/ManagePage/backtests/constants";

//graphql
import { formatBackTestsData, getItemsCount, getSearchOptions } from "components/pages/ManagePage/backtests/utils";
import { ManagementTemplate } from "components/layout";
import { TableWithQuery } from "components/pages/ManagePage/common/TableWithQuery";
import { BACKTEST, BACKTESTS, BACKTESTS_AGGREGATE } from "graphql/manage/queries";
import { BackTestTabs } from "components/pages/ManagePage/backtests/components/BackTestTabs";
import useWindowDimensions from "hooks/useWindowDimensions";
import { Title } from "components/pages/ManagePage/backtests/components/Title";
import { Container } from "components/pages/ManagePage/backtests/components/Container";

const ManageBackTests: React.FC = () => {
    const [selectedBackTestRobotID, setBackTestRobotID] = useState(null);
    const [robotData, setRobotData] = useState(null);

    const { width } = useWindowDimensions();

    const searchByRobotId = () => ({ robot_id: { _eq: selectedBackTestRobotID } });

    const handleRowClick = (row) => setBackTestRobotID(row.robot_id);

    return (
        <ManagementTemplate title={PageType.manageBacktests} page={PageType.manageBacktests}>
            <Container>
                <Title title="Back Tests" />
                <TableWithQuery
                    onRowClick={handleRowClick}
                    query={BACKTESTS}
                    aggregate_query={BACKTESTS_AGGREGATE}
                    columns={BACKTESTS_TABLE_COLUMNS}
                    formatData={formatBackTestsData}
                    getItemsCount={getItemsCount}
                    getSearchOptions={getSearchOptions}
                />
            </Container>
            <Container>
                <Title title="Back Test's Robots" />
                {selectedBackTestRobotID && (
                    <TableWithQuery
                        headerStyles={{ width: "100%" }}
                        onRowClick={setRobotData}
                        query={BACKTEST}
                        aggregate_query={BACKTESTS_AGGREGATE}
                        columns={BACKTEST_ITEM_TABLE_COLUMNS}
                        formatData={formatBackTestsData}
                        getItemsCount={getItemsCount}
                        getSearchOptions={searchByRobotId}
                    />
                )}
            </Container>
            <Container>
                {robotData && (
                    <>
                        <Title title={robotData.robot.code} />
                        <BackTestTabs robotData={robotData} width={width} robot_id={selectedBackTestRobotID} />
                    </>
                )}
            </Container>
        </ManagementTemplate>
    );
};

export default ManageBackTests;
