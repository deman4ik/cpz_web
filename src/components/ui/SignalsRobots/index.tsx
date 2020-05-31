import React, { memo, useMemo } from "react";
import { useQuery } from "@apollo/react-hooks";

import { USER_SIGNALS } from "graphql/signals/queries";
import { USER_ROBOTS } from "graphql/robots/queries";
import { POLL_INTERVAL } from "config/constants";
import { RobotsPageContainer } from "./RobotsPageContainer";
import { getFormatDataSignals, getFormatDataRobots, title } from "./helpers";
import styles from "./index.module.css";

interface Props {
    width: number;
    displayType: string;
}

const _SignalRobots: React.FC<Props> = ({ width, displayType }) => {
    const { data, loading } = useQuery(displayType === "signals" ? USER_SIGNALS : USER_ROBOTS, {
        pollInterval: POLL_INTERVAL
    });

    const funcCall = {
        signals: () => getFormatDataSignals(data.signals),
        robots: () => getFormatDataRobots(data.robots)
    };

    const formatData = useMemo(() => (!loading && data ? funcCall[displayType]() : []), [
        data,
        displayType,
        funcCall,
        loading
    ]);

    return (
        <div style={{ marginTop: 10 }}>
            <div className={styles.regionTitle}>{title[displayType]}</div>
            <RobotsPageContainer data={formatData} displayType={displayType} width={width} />
        </div>
    );
};

export const SignalRobots = memo(_SignalRobots);
