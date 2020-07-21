/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useMemo, useContext } from "react";
import { useQuery } from "@apollo/client";

// graphql
import { USER_SIGNALS } from "graphql/signals/queries";
import { USER_ROBOTS } from "graphql/robots/queries";
// constants
import { POLL_INTERVAL } from "config/constants";
// components
import { RobotsPageContainer } from "./RobotsPageContainer";
// helpers
import { getFormatDataSignals, getFormatDataRobots, title } from "./helpers";
// styles
import styles from "./index.module.css";
// context
import { AuthContext } from "libs/hoc/authContext";

interface Props {
    width: number;
    displayType: string;
}

const _SignalRobots: React.FC<Props> = ({ width, displayType }) => {
    const {
        authState: { user_id }
    } = useContext(AuthContext);

    const { data, loading } = useQuery(displayType === "signals" ? USER_SIGNALS : USER_ROBOTS, {
        pollInterval: POLL_INTERVAL,
        variables: { user_id }
    });

    const funcCall = {
        signals: () => getFormatDataSignals(data.signals),
        robots: () => getFormatDataRobots(data.robots)
    };

    const formatData = useMemo(() => (!loading && data ? funcCall[displayType]() : []), [data, loading]);

    return (
        <div style={{ marginTop: 10 }}>
            <div className={styles.regionTitle}>{title[displayType]}</div>
            <RobotsPageContainer data={formatData} displayType={displayType} width={width} />
        </div>
    );
};

export const SignalRobots = memo(_SignalRobots);
