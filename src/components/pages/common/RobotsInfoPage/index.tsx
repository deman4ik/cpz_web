import React, { memo, useContext, useMemo } from "react";
import useWindowDimensions from "hooks/useWindowDimensions";
import { PageType, PositionDirection, RobotsType } from "config/types";
import { DefaultTemplate } from "components/layout";
import { LoadingIndicator, PageToolbar } from "components/common";
import { RobotPerformance } from "components/ui/RobotPerformance";
import { SignalRobots } from "components/ui/SignalsRobots";
import { useQueryWithAuth } from "hooks/useQueryWithAuth";
import { formatStats, queryParam } from "components/ui/RobotPerformance/helpers";
import { POLL_INTERVAL, SCREEN_TYPE } from "config/constants";
import { AuthContext } from "providers/authContext";
import {
    AGGREGATED_OPEN_POSITIONS_FOR_SIGNLAS_BY_DIRECTION,
    ALL_USER_ROBOTS_AGGR_STATS,
    USER_SIGNALS
} from "graphql/signals/queries";
import { formatTradingRobots, formatSignalRobots } from "components/ui/SignalsRobots/helpers";
import { AGGREGATED_OPEN_USER_POSITIONS_BY_DIRECTION, USER_ROBOTS } from "graphql/robots/queries";
import style from "./index.module.css";
import { RobotAggrOpenPositionsCard } from "components/ui/RobotAggrOpenPositionsCard";
import { parseAggregatedPositionsData } from "components/ui/RobotAggrOpenPositionsCard/helpers";
import RobotsGuide from "./RobotsGuide";
import useSaveScroll from "hooks/useSaveScroll";

type Props = {
    type: RobotsType;
};

const RobotsPage: React.FC<Props> = ({ type }) => {
    const typeIsSignals = type === RobotsType.signals;
    const { width } = useWindowDimensions();
    const {
        authState: { isAuth, user_id }
    } = useContext(AuthContext);

    // FOR TOTAL PERFORMANCE TAB
    const { data: aggrData, loading: aggrDataLoading } = useQueryWithAuth(true, ALL_USER_ROBOTS_AGGR_STATS, {
        variables: { type: { _eq: queryParam[type] }, user_id },
        pollInterval: POLL_INTERVAL
    });

    // FOR ROBOTS TAB
    const { data: robotsData, loading: robotsLoading, refetch } = useQueryWithAuth(
        true,
        typeIsSignals ? USER_SIGNALS : USER_ROBOTS,
        {
            pollInterval: POLL_INTERVAL,
            variables: { user_id }
        }
    );
    // TODO: use single function to parse both signal and trading robots
    const formatRobots = typeIsSignals ? formatSignalRobots : formatTradingRobots;
    const parsedRobotsData = useMemo(() => formatRobots(typeIsSignals ? robotsData?.signals : robotsData?.robots), [
        formatRobots,
        robotsData?.robots,
        robotsData?.signals,
        typeIsSignals
    ]);

    // FOR OPEN POSITIONS
    const aggOpenPositionsQuery = typeIsSignals
        ? AGGREGATED_OPEN_POSITIONS_FOR_SIGNLAS_BY_DIRECTION
        : AGGREGATED_OPEN_USER_POSITIONS_BY_DIRECTION;

    const { data: shortPositionsAggrData, loading: shortPosLoading } = useQueryWithAuth(true, aggOpenPositionsQuery, {
        variables: { user_id, direction: PositionDirection.short }
    });
    const { data: longPositionsAggrData, loading: longPosLoading } = useQueryWithAuth(true, aggOpenPositionsQuery, {
        variables: { user_id, direction: PositionDirection.long }
    });

    const short = parseAggregatedPositionsData(shortPositionsAggrData, type);
    const long = parseAggregatedPositionsData(longPositionsAggrData, type);

    const userHasRobots = useMemo(() => robotsData && robotsData[type].length > 0, [robotsData, type]);

    useSaveScroll(`${type}-page`, robotsLoading);
    return (
        <DefaultTemplate
            page={typeIsSignals ? PageType.signals : PageType.robots}
            title={typeIsSignals ? PageType.signals : PageType.robots}
            subTitle={typeIsSignals ? "Manual Trading" : "Automated Trading"}
            toolbar={<PageToolbar displayType={typeIsSignals ? RobotsType.signals : RobotsType.robots} />}>
            {(!!isAuth && typeof robotsData === "undefined") ||
            aggrDataLoading ||
            robotsLoading ||
            shortPosLoading ||
            longPosLoading ? (
                <LoadingIndicator style={{ height: 400 }}/>
            ) :userHasRobots ? (
                <>
                    <div className={style.doubledSection}>
                        <RobotPerformance
                            width={SCREEN_TYPE.TABLET}
                            type={type}
                            data={formatStats(aggrData?.stats, type)}
                            titlePrefix="My"
                        />
                        <RobotAggrOpenPositionsCard openPositionsAggrData={{ long, short }} type={type} />
                    </div>
                    <div className={style.section}>
                        <span className={style.sectionHeader}>{`My ${
                            typeIsSignals ? "Signal" : "Trading"
                        } Robots`}</span>
                        <SignalRobots data={parsedRobotsData} width={width} type={type} refetch={refetch} />
                    </div>
                </>
            ) : (
                <div style={{ padding: 5 }}>
                    <RobotsGuide type={type} />
                </div>
            )}
        </DefaultTemplate>
    );
};

export default memo(RobotsPage);
