/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useState, useEffect, useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
// graphql
import { GET_USER_AGGR_STATS_ALL } from "graphql/signals/queries";
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
import { AuthContext } from "libs/hoc/authContext";

interface Props {
    width: number;
    type: displayType;
}

const _RobotPerformance: React.FC<Props> = ({ width, type }) => {
    const {
        authState: { user_id }
    } = useContext(AuthContext);

    const [formatData, setFormatData] = useState([]);
    const { data, loading } = useQuery(GET_USER_AGGR_STATS_ALL, {
        variables: { type: { _eq: queryParam[type] }, user_id },
        pollInterval: POLL_INTERVAL
    });

    useEffect(() => {
        if (!loading && data) {
            setFormatData(getFormatData(data.stats, type));
        }
    }, [loading, data]);

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
