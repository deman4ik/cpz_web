import React, { FC } from "react";
import TabNavigation from "components/basic/TabNavigation";
import { PerformanceTab } from "components/ui/PerformanceTab";
import { BackSettingsTable } from "components/pages/ManagePage/backtests/components/BackSettingsTable";
import { BackTestPositions } from "components/pages/ManagePage/backtests/components/BackTestPositions";

interface BackTestTabsProps {
    robotData: any;
    width: number;
    robot_id: string;
}
export const BackTestTabs: FC<BackTestTabsProps> = ({ robotData, width, robot_id }) => {
    const tabSchema = [
        {
            title: "Public Performance",
            tabPage: (
                <PerformanceTab fullStats={(robotData && robotData.backtest_stats) || null} width={width} fullWidth />
            )
        },
        {
            title: "Settings",
            tabPage: <BackSettingsTable tableData={[robotData.backtest_settings]} />
        },
        {
            title: "Positions",
            tabPage: <BackTestPositions robot={robotData} width={width} />
        }
    ];
    return (
        <div style={{ minHeight: 700 }}>
            <TabNavigation tabSchema={tabSchema} />
        </div>
    );
};
