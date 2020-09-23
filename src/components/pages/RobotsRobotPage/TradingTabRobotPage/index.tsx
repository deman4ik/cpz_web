import React, { useState, memo } from "react";

import { CandleChart, ClosedPositionContainer, OpenPositionContainer } from "./components";
import { useFetchPositionData } from "./useFetchPositionData";
import { LoadingIndicator } from "components/common";

interface Props {
    robotData: any;
    width: number;
}

const _TradingTabRobotPage: React.FC<Props> = ({ robotData, width }) => {
    const [isChartLoaded, setIsChartLoaded] = useState(false);
    const { user_robots: userRobot, robot } = robotData;

    const {
        openPositions,
        closedPositions,
        isLoadingMore,
        recordsCount,
        handleLoadMore,
        loading
    } = useFetchPositionData(robotData);

    return (
        <>
            {loading ? (
                <LoadingIndicator style={{ height: 400 }} />
            ) : (
                <>
                    <CandleChart
                        robot={robot}
                        userRobot={userRobot}
                        width={width}
                        setIsChartLoaded={setIsChartLoaded}
                    />
                    <OpenPositionContainer robot={robot} positions={openPositions} />
                    <ClosedPositionContainer
                        robot={robot}
                        handleLoadMore={handleLoadMore}
                        positions={closedPositions}
                        recordsCount={recordsCount}
                        width={width}
                        isLoadingMore={isLoadingMore}
                    />
                </>
            )}
        </>
    );
};

export const TradingTabRobotPage = memo(_TradingTabRobotPage);
