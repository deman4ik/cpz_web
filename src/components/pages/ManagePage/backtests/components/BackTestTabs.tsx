import React, { FC } from "react";
import TabNavigation from "components/basic/TabNavigation";
import { PerformanceTab } from "components/ui/PerformanceTab";
import { BackSettingsTable } from "components/pages/ManagePage/backtests/components/BackSettingsTable";
import { BackTestPositions } from "components/pages/ManagePage/backtests/components/BackTestPositions";
import useFetchBackTestPosition from "components/pages/ManagePage/backtests/components/useFetchBackTestPositiions";
import { TableWithQuery } from "components/pages/ManagePage/common/TableWithQuery";
import { BACKTEST_SIGNALS, BACKTEST_SIGNALS_AGGREGATE } from "graphql/robots/backtest";
import { BACKTEST_SIGNALS_COLUMNS } from "components/pages/ManagePage/backtests/constants";
import { BackTestLogs } from "components/pages/ManagePage/backtests/components/BackTestLogs";

interface BackTestTabsProps {
    robotData: any;
    width: number;
}
export const BackTestTabs: FC<BackTestTabsProps> = ({ robotData, width }) => {
    const tradingPageData = useFetchBackTestPosition(robotData);

    const { backtest_settings } = robotData || {};
    const tabSchema = [
        {
            title: "Public Performance",
            tabPage: <PerformanceTab fullStats={(robotData && robotData.backtest_stats) || {}} />
        },
        {
            title: "Settings",
            tabPage: <BackSettingsTable tableData={backtest_settings ? [backtest_settings] : null} />
        },
        {
            title: "Positions",
            tabPage: <BackTestPositions robot={robotData} width={width} tradingPageData={tradingPageData} />
        },
        {
            title: "Signals",
            tabPage: (
                <TableWithQuery
                    headerStyles={{ width: "100%" }}
                    aggregate_query={BACKTEST_SIGNALS_AGGREGATE}
                    formatData={(data) => data.backtest_signals}
                    query={BACKTEST_SIGNALS}
                    columns={BACKTEST_SIGNALS_COLUMNS()}
                />
            )
        },
        {
            title: "Logs",
            tabPage: <BackTestLogs logs={robotData?.backtest_logs || null} />
        }
    ];
    return (
        <div style={{ minHeight: 900 }}>
            <TabNavigation tabSchema={tabSchema} />
        </div>
    );
};
