import React, { FC, useMemo } from "react";
import styles from "components/ui/RobotPerformance/index.module.css";
import { PerformanceEmpty } from "components/ui/RobotPerformance/PerformanceEmpty";
import { PerformanceComponent } from "components/ui/RobotPerformance/PerformanceComponent";
import { useQueryWithAuth } from "hooks/useQueryWithAuth";
import { POLL_INTERVAL } from "config/constants";
import useWindowDimensions from "hooks/useWindowDimensions";
import { formatStats } from "components/ui/RobotPerformance/helpers";
import { Card } from "components/basic";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { DocumentNode } from "@apollo/client";
import { mapRoutesToDisplayTypes } from "components/pages/ManagePage/robotStats/constants";
import { PageType } from "config/types";

interface RobotsTotalPerformanceProps {
    title: string;
    type: string;
    query: DocumentNode | TypedDocumentNode<any, any>;
}
export const RobotsTotalPerformance: FC<RobotsTotalPerformanceProps> = ({ title, query, type }) => {
    const { width } = useWindowDimensions();
    const displayType = `manage/${type}`;

    const { data, loading } = useQueryWithAuth(true, query, {
        pollInterval: POLL_INTERVAL
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const formattedData = useMemo(() => !loading && data && formatStats(data.stats, type), [loading, data]);
    return (
        <Card className={styles.card}>
            <div className={styles.regionTitle}>{title}</div>
            {!(formattedData && formattedData.length) ? (
                <PerformanceEmpty
                    width={width}
                    displayType={displayType}
                    title={PageType[mapRoutesToDisplayTypes[displayType]]}
                />
            ) : (
                <PerformanceComponent width={width} formatData={formattedData} displayType={displayType} compact />
            )}
        </Card>
    );
};
