import React, { FC, useMemo } from "react";
import { PerformanceEmpty } from "components/ui/RobotPerformance/PerformanceEmpty";
import { PerformanceComponent } from "components/ui/RobotPerformance/PerformanceComponent";
import { useQueryWithAuth } from "hooks/useQueryWithAuth";
import { POLL_INTERVAL, SCREEN_TYPE } from "config/constants";
import { formatStats } from "components/ui/RobotPerformance/helpers";
import { mapRoutesToDisplayTypes } from "components/pages/ManagePage/robotStats/constants";
import { PageType } from "config/types";
import { QueryType } from "components/pages/ManagePage/common/types";

interface RobotsTotalPerformanceProps {
    titlePrefix?: string;
    type: string;
    query: QueryType;
}
export const RobotsTotalPerformance: FC<RobotsTotalPerformanceProps> = ({ titlePrefix, query, type }) => {
    const displayType = `manage/${type}`;

    const { data, loading } = useQueryWithAuth(true, query, {
        pollInterval: POLL_INTERVAL
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const formattedData = useMemo(() => !loading && data && formatStats(data.stats, type), [loading, data]);
    return !(formattedData && formattedData.length) ? (
        <PerformanceEmpty
            width={SCREEN_TYPE.TABLET}
            displayType={displayType}
            title={PageType[mapRoutesToDisplayTypes[displayType]]}
        />
    ) : (
        <PerformanceComponent
            width={SCREEN_TYPE.TABLET}
            formatData={formattedData}
            displayType={displayType}
            titlePrefix={titlePrefix}
            compact
        />
    );
};
