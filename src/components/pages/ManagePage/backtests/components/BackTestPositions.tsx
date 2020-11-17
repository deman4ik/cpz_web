import React, { FC, useState } from "react";
import { candleQueries } from "components/pages/helpers";
import { CandleChartComponent } from "components/common/CandleChartComponent";
import styles from "components/pages/SignalRobotPage/TradingTab/index.module.css";
import { LoadingIndicator } from "components/common";
import {
    ClosedPositionContainer,
    OpenPositionContainer
} from "components/pages/TradingRobotPage/TradingTab/components";

interface BackTestPositionsProps {
    robot: any;
    tradingPageData: any;
    width: number;
}
export const BackTestPositions: FC<BackTestPositionsProps> = ({ robot, width, tradingPageData }) => {
    const { timeframe, id: backtest_id } = robot;
    const [chartLoading, setLoading] = useState(true);
    const signalCandleQueries = candleQueries(timeframe).backtest;

    const { openPositions, closedPositions, isLoadingMore, recordsCount, handleLoadMore, loading } = tradingPageData;
    const variables = { backtest_id };

    return (
        <div>
            {(chartLoading || loading) && (
                <div className={styles.loading}>
                    <LoadingIndicator />
                </div>
            )}
            <CandleChartComponent
                fullWidth
                robot={robot}
                variables={variables}
                realTimeSubQuery={signalCandleQueries.realTimeSub}
                historyQuery={signalCandleQueries.history}
                width={width}
                setIsChartLoaded={() => setLoading(false)}
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
        </div>
    );
};
