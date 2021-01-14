import React, { FC } from "react";
import { getLogsColumns } from "components/pages/ManagePage/backtests/constants";
import { TableComponent } from "components/pages/ManagePage/common/TableComponent";
import { NoRecentData } from "components/common";

interface BackTestLogsProps {
    logs: any;
}

const EMPTY_LOGS_MESSAGE = "No Logs Found";
export const BackTestLogs: FC<BackTestLogsProps> = ({ logs }) => {
    return (
        <div>
            {logs && logs.length ? (
                <TableComponent
                    headerStyles={{ width: "100%" }}
                    columns={getLogsColumns()}
                    setFilters={() => null}
                    setPageIndex={() => null}
                    withoutPagination
                    itemsCount={0}
                    data={logs}
                    loading={false}
                />
            ) : (
                <NoRecentData message={EMPTY_LOGS_MESSAGE} />
            )}
        </div>
    );
};
