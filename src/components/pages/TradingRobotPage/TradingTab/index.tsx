import React, { useState, memo, useMemo } from "react";

import { CandleChart, ClosedPositionContainer, OpenPositionContainer } from "./components";
import { LoadingIndicator } from "components/common";

interface Props {
    robotData: any;
    tradingData: any;
    width: number;
}

const _TradingTab: React.FC<Props> = ({ robotData, tradingData, width }) => {
    const { userRobot, robot } = robotData;
    const { openPositions, closedPositions, isLoadingMore, recordsCount, handleLoadMore, loading } = useMemo(
        () => tradingData,
        [tradingData]
    );
    return (
        <>
            {loading ? (
                <LoadingIndicator style={{ height: 400 }} />
            ) : (
                <>
                    <CandleChart robot={robot} userRobot={userRobot} width={width} />
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

export default memo(_TradingTab);
