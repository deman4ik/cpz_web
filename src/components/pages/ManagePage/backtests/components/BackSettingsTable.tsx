import React, { FC } from "react";
import { TableComponent } from "components/pages/ManagePage/common/TableComponent";
import { BackSettingsTableColumns } from "components/pages/ManagePage/backtests/constants";

interface BackSettingsTableProps {
    tableData: Array<{
        robot_settings: any;
        strategy_settings: any;
        active_from: string;
    }>;
}

export const BackSettingsTable: FC<BackSettingsTableProps> = ({ tableData }) => {
    return (
        <TableComponent
            headerStyles={{ width: "100%" }}
            columns={BackSettingsTableColumns}
            setFilters={() => null}
            getSearchOptions={null}
            setPageIndex={() => null}
            pageCount={1}
            withoutPagination
            itemsCount={1}
            data={tableData}
            loading={false}
        />
    );
};
