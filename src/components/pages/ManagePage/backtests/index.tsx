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
import { BackTestTabs } from "components/pages/ManagePage/backtests/components/BackTestTabs";
import useWindowDimensions from "hooks/useWindowDimensions";
import { Title } from "components/pages/ManagePage/backtests/components/Title";
import { Container } from "components/pages/ManagePage/backtests/components/Container";
import { BACKTEST, BACKTESTS, BACKTESTS_AGGREGATE } from "graphql/robots/backtest";

const ManageBackTests: React.FC = () => {
    const [selectedBackTestRobotID, setBackTestRobotID] = useState(null);
    const [robotData, _setRobotData] = useState(null);

    const setRobotData = (data) => {
        _setRobotData(data);
        console.log(data)
    };
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
                {selectedBackTestRobotID && (
                    <>
                        <Title title="Back Test's Robots" />
                        <TableWithQuery
                            withoutPagination
                            onRowClick={setRobotData}
                            query={BACKTEST}
                            aggregate_query={BACKTESTS_AGGREGATE}
                            columns={BACKTEST_ITEM_TABLE_COLUMNS(width)}
                            formatData={formatBackTestsData}
                            getSearchOptions={searchByRobotId}
                        />
                    </>
                )}
            </Container>
            <Container>
                {robotData && (
                    <>
                        <Title title="Robot Stats" />
                        <BackTestTabs robotData={robotData} width={width} />
                    </>
                )}
            </Container>
        </ManagementTemplate>
    );
};

export default ManageBackTests;
