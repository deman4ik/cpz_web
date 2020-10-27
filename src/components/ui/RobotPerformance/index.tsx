import React, { memo, useState, useEffect, useContext } from "react";
import { useQuery } from "@apollo/client";
// graphql
import { ALL_USER_SIGNAL_ROBOTS_STATS_AGGREGATE } from "graphql/signals/queries";
// constants
import { POLL_INTERVAL } from "config/constants";
// components
import { PerformanceEmpty } from "./PerformanceEmpty";
import { PerformanceComponent } from "./PerformanceComponent";
// helpers
import { getFormatData, queryParam, title } from "./helpers";
// types
import { displayType } from "./types";
// styles
import styles from "./index.module.css";
// context
import { AuthContext } from "libs/hoc/context";
import { useQueryWithAuth } from "hooks/useQueryWithAuth";

interface Props {
    width: number;
    type: displayType;
}

const _RobotPerformance: React.FC<Props> = ({ width, type }) => {
    const {
        authState: { user_id }
    } = useContext(AuthContext);

    const [formatData, setFormatData] = useState([]);
    const { data, loading } = useQueryWithAuth(true, ALL_USER_SIGNAL_ROBOTS_STATS_AGGREGATE, {
        variables: { type: { _eq: queryParam[type] }, user_id },
        pollInterval: POLL_INTERVAL
    });

    useEffect(() => {
        if (!loading && data) {
            setFormatData(getFormatData(data.stats, type));
        }
    }, [loading, data, type]);

    return (
        <div className={styles.container}>
            <div className={styles.regionTitle}>{title[type]}</div>
            {!formatData.length ? (
                <PerformanceEmpty width={width} displayType={type} />
            ) : (
                <PerformanceComponent width={width} formatData={formatData} displayType={type} />
            )}
        </div>
    );
};

export const RobotPerformance = memo(_RobotPerformance);
