import React, { FC } from "react";
import { TableComponent } from "components/pages/ManagePage/common/TableComponent";
import { BackSettingsTableColumns, getLogsColumns } from "components/pages/ManagePage/backtests/constants";
import { NoRecentData } from "components/common";

type Settings = {
    robot_settings: any;
    strategy_settings: any;
    active_from: string;
};
interface BackSettingsTableProps {
    tableData: Settings[];
}

const EMPTY_SETTINGS_MESSAGE = "No settings available"
export const BackSettingsTable: FC<BackSettingsTableProps> = ({ tableData }) => {
    return (
        <div>
            {tableData ? (
                <TableComponent
                    headerStyles={{ width: "100%" }}
                    columns={BackSettingsTableColumns}
                    setFilters={() => null}
                    setPageIndex={() => null}
                    withoutPagination
                    data={tableData}
                    loading={false}
                />
            ) : (
                <NoRecentData message={EMPTY_SETTINGS_MESSAGE} />
            )}
        </div>
    );
};
