import React, { memo, useContext } from "react";
import { PageType, RobotsType } from "config/types";
import { useQueryWithAuth } from "hooks/useQueryWithAuth";
import { OPEN_POSITIONS_FOR_USER_SIGNALS } from "graphql/signals/queries";
import { OPEN_USER_POSITIONS } from "graphql/robots/queries";
import { POLL_INTERVAL } from "config/constants";
import { formatSignalsPositions, formatTradingRobotPositions } from "components/ui/RobotOpenPositions/helpers";
import RobotOpenPositions from "components/ui/RobotOpenPositions";
import { AuthContext } from "../../../providers/authContext";
import { DefaultTemplate } from "components/layout";
import { capitalize } from "lodash";

interface Props {
    type: RobotsType;
}

const _RobotOpenPositionsPage: React.FC<Props> = ({ type }) => {
    const typeIsSignals = type === RobotsType.signals;

    const {
        authState: { user_id }
    } = useContext(AuthContext);

    // FOR OPEN POSITIONS TAB
    const { data: openPositionsData } = useQueryWithAuth(
        true,
        typeIsSignals ? OPEN_POSITIONS_FOR_USER_SIGNALS : OPEN_USER_POSITIONS,
        {
            pollInterval: POLL_INTERVAL,
            variables: { user_id }
        }
    );
    // TODO: use single function to parse both signal and trading robots
    const formatPositions = typeIsSignals ? formatSignalsPositions : formatTradingRobotPositions;

    return (
        <DefaultTemplate page={PageType[type]} title="Open Positions" subTitle={capitalize(type)} handleBackNavigation>
            <div style={{ padding: "5px 0 0 5px" }}>
                <RobotOpenPositions type={type} data={formatPositions(openPositionsData?.positions)} />
            </div>
        </DefaultTemplate>
    );
};

export const RobotOpenPositionsPage = memo(_RobotOpenPositionsPage);
