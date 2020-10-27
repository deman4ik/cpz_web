import React, { memo, useEffect, useState, useContext } from "react";
import { useQuery } from "@apollo/client";

// components
import { OpenPositionsComponent } from "./OpenPositionsComponent";
// graphql
import { OPEN_POSITIONS_FOR_USER_SIGNALS } from "graphql/signals/queries";
import { OPEN_USER_POSITIONS } from "graphql/robots/queries";
// constants
import { POLL_INTERVAL } from "config/constants";
// helpers
import { formatPositionsForSignals, getFormatDataRobots } from "./helpers";
// context
import { AuthContext } from "libs/hoc/context";
import { useQueryWithAuth } from "hooks/useQueryWithAuth";

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
    const { data, loading } = useQueryWithAuth(
        true,
        type === "signals" ? OPEN_POSITIONS_FOR_USER_SIGNALS : OPEN_USER_POSITIONS,
        {
            pollInterval: POLL_INTERVAL,
            variables: { user_id }
        }
    );

    const funcCall = {
        signals: () => formatPositionsForSignals(data.positions),
        robots: () => getFormatDataRobots(data.positions)
    };

    useEffect(() => {
        if (!loading && data) {
            setFormatData(funcCall[type]());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, loading]);

    return <OpenPositionsComponent formatData={formatData} width={width} displayType={type} />;
};

export const RobotOpenPositions = memo(_RobotOpenPositions);
