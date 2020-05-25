/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";

import { OpenPositionsComponent } from "./OpenPositionsComponent";
import { USER_SIGNALS_ROBOT_OPEN_POS } from "../../../graphql/signals/queries";
import { GET_USER_POSITIONS_OPEN_POS } from "../../../graphql/robots/queries";
import { POLL_INTERVAL } from "../../../config/constants";
import { getFormatDataSignals, getFormatDataRobots } from "./helpers";

interface Props {
    type: string;
    width: number;
}

const _RobotOpenPositions: React.FC<Props> = ({ type, width }) => {
    const [formatData, setFormatData] = useState([]);
    const { data, loading } = useQuery(type === "signals" ? USER_SIGNALS_ROBOT_OPEN_POS : GET_USER_POSITIONS_OPEN_POS, {
        pollInterval: POLL_INTERVAL
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
