import React, { memo, useContext } from "react";
import useWindowDimensions from "hooks/useWindowDimensions";
import { PageType, RobotsType } from "config/types";
import { DefaultTemplate } from "components/layout";
import { PageToolbar } from "components/common";
import { RobotPerformance } from "components/ui/RobotPerformance";
import RobotOpenPositions from "components/ui/RobotOpenPositions";
import { SignalRobots } from "components/ui/SignalsRobots";
import TabNavigation from "components/basic/TabNavigation";
import { useQueryWithAuth } from "hooks/useQueryWithAuth";
import { formatStats, queryParam } from "components/ui/RobotPerformance/helpers";
import { POLL_INTERVAL } from "config/constants";
import { AuthContext } from "libs/hoc/context";
import { ALL_USER_ROBOTS_AGGR_STATS, OPEN_POSITIONS_FOR_USER_SIGNALS, USER_SIGNALS } from "graphql/signals/queries";
import { formatTradingRobots, formatSignalRobots } from "components/ui/SignalsRobots/helpers";
import { OPEN_USER_POSITIONS, USER_ROBOTS } from "graphql/robots/queries";
import { formatSignalsPositions, formatTradingRobotPositions } from "components/ui/RobotOpenPositions/helpers";

type Props = {
    type: RobotsType;
};

const RobotsPage: React.FC<Props> = ({ type }) => {
    const typeIsSignals = type === RobotsType.signals;
    const { width } = useWindowDimensions();
    const {
        authState: { user_id }
    } = useContext(AuthContext);

    // FOR TOTAL PERFORMANCE TAB
    const { data: allRobotsData } = useQueryWithAuth(true, ALL_USER_ROBOTS_AGGR_STATS, {
        variables: { type: { _eq: queryParam[type] }, user_id },
        pollInterval: POLL_INTERVAL
    });

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

    // FOR ROBOTS TAB
    const { data: robotsData, refetch } = useQueryWithAuth(true, typeIsSignals ? USER_SIGNALS : USER_ROBOTS, {
        pollInterval: POLL_INTERVAL,
        variables: { user_id }
    });
    // TODO: use single function to parse both signal and trading robots
    const formatRobots = typeIsSignals ? formatSignalRobots : formatTradingRobots;

    const tabSchema = [
        {
            title: "Total Performance",
            tabPage: <RobotPerformance width={width} type={type} data={formatStats(allRobotsData?.stats, type)} />
        },
        {
            title: "Open Positions",
            tabPage: <RobotOpenPositions type={type} data={formatPositions(openPositionsData?.positions)} />
        },
        {
            title: `${typeIsSignals ? "Signal" : "Trading"} robots`,
            tabPage: (
                <SignalRobots
                    data={formatRobots(typeIsSignals ? robotsData?.signals : robotsData?.robots)}
                    width={width}
                    type={type}
                    refetch={refetch}
                />
            )
        }
    ];

    return (
        <DefaultTemplate
            page={typeIsSignals ? PageType.signals : PageType.robots}
            title={typeIsSignals ? "Signals" : "Robots"}
            subTitle={typeIsSignals ? "Manual Trading" : "Automated Trading"}
            width={width}
            toolbar={<PageToolbar displayType="robots" />}>
            <TabNavigation tabSchema={tabSchema} />
        </DefaultTemplate>
    );
};

export default memo(RobotsPage);
