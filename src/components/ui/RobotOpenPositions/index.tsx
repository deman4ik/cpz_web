/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect, useState, useContext } from "react";
import { useQuery } from "@apollo/react-hooks";

// components
import { OpenPositionsComponent } from "./OpenPositionsComponent";
// graphql
import { USER_SIGNALS_ROBOT_OPEN_POS } from "graphql/signals/queries";
import { GET_USER_POSITIONS_OPEN_POS } from "graphql/robots/queries";
// constants
import { POLL_INTERVAL } from "config/constants";
// helpers
import { getFormatDataSignals, getFormatDataRobots } from "./helpers";
// context
import { AuthContext } from "libs/hoc/authContext";

interface Props {
    type: string;
    width: number;
}

const _RobotOpenPositions: React.FC<Props> = ({ type, width }) => {
    /*Auth user id*/
    const {
        authState: { user_id }
    } = useContext(AuthContext);

    const [formatData, setFormatData] = useState([]);
    const { data, loading } = useQuery(type === "signals" ? USER_SIGNALS_ROBOT_OPEN_POS : GET_USER_POSITIONS_OPEN_POS, {
        pollInterval: POLL_INTERVAL,
        variables: { user_id }
    });

    const funcCall = {
        signals: () => getFormatDataSignals(data.positions),
        robots: () => getFormatDataRobots(data.positions)
    };

    useEffect(() => {
        if (!loading && data) {
            setFormatData(funcCall[type]());
        }
    }, [data, loading]);

    return <OpenPositionsComponent formatData={formatData} width={width} displayType={type} />;
};

export const RobotOpenPositions = memo(_RobotOpenPositions);
