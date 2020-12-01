import React, { memo, useContext } from "react";
import useWindowDimensions from "hooks/useWindowDimensions";
import { PageType, RobotsType } from "config/types";
import { DefaultTemplate } from "components/layout";
import { PageToolbar } from "components/common";
import { RobotPerformance } from "components/ui/RobotPerformance";
import { SignalRobots } from "components/ui/SignalsRobots";
import TabNavigation from "components/basic/TabNavigation";
import { useQueryWithAuth } from "hooks/useQueryWithAuth";
import { formatStats, queryParam } from "components/ui/RobotPerformance/helpers";
import { POLL_INTERVAL } from "config/constants";
import { AuthContext } from "libs/hoc/context";
import { ALL_USER_ROBOTS_AGGR_STATS, USER_SIGNALS } from "graphql/signals/queries";
import { formatTradingRobots, formatSignalRobots } from "components/ui/SignalsRobots/helpers";
import { USER_ROBOTS } from "graphql/robots/queries";
import { AddRobotsCardWithHeader } from "components/common/AddRobotsCardWithHeader";
import { useRouter } from "next/router";

type Props = {
    type: RobotsType;
};

const RobotsPage: React.FC<Props> = ({ type }) => {
    const typeIsSignals = type === RobotsType.signals;
    const { width } = useWindowDimensions();
    const {
        authState: { user_id }
    } = useContext(AuthContext);
    const router = useRouter();
    const defaultOpenTab = Number(router.query.tab || 0);

    // FOR TOTAL PERFORMANCE TAB
    const { data: allRobotsData } = useQueryWithAuth(true, ALL_USER_ROBOTS_AGGR_STATS, {
        variables: { type: { _eq: queryParam[type] }, user_id },
        pollInterval: POLL_INTERVAL
    });

    // FOR ROBOTS TAB
    const { data: robotsData, refetch } = useQueryWithAuth(true, typeIsSignals ? USER_SIGNALS : USER_ROBOTS, {
        pollInterval: POLL_INTERVAL,
        variables: { user_id }
    });
    // TODO: use single function to parse both signal and trading robots
    const formatRobots = typeIsSignals ? formatSignalRobots : formatTradingRobots;

    const parsedRobotsData = formatRobots(typeIsSignals ? robotsData?.signals : robotsData?.robots);

    const userHasRobots = parsedRobotsData.length > 0;
    const tabSchema = [
        {
            title: "Total Performance",
            tabPage: <RobotPerformance width={width} type={type} data={formatStats(allRobotsData?.stats, type)} />
        },
        {
            title: `${typeIsSignals ? "Signal" : "Trading"} robots`,
            tabPage: <SignalRobots data={parsedRobotsData} width={width} type={type} refetch={refetch} />
        }
    ];

    return (
        <DefaultTemplate
            page={typeIsSignals ? PageType.signals : PageType.robots}
            title={typeIsSignals ? PageType.signals : PageType.robots}
            subTitle={typeIsSignals ? "Manual Trading" : "Automated Trading"}
            toolbar={<PageToolbar displayType={typeIsSignals ? RobotsType.signals : RobotsType.robots} />}>
            {userHasRobots ? (
                <TabNavigation defaultActiveTab={defaultOpenTab} tabSchema={tabSchema} />
            ) : (
                <div style={{ padding: 5 }}>
                    <AddRobotsCardWithHeader type={type} />
                </div>
            )}
        </DefaultTemplate>
    );
};

export default memo(RobotsPage);
