import React, { FC, useState } from "react";
import { candleQueries } from "components/pages/helpers";
import { CandleChartComponent } from "components/common/CandleChartComponent";
import styles from "components/pages/SignalRobotPage/TradingTab/index.module.css";
import { LoadingIndicator } from "components/common";

interface BackTestPositionsProps {
    robot: any;
    width: number;
}
export const BackTestPositions: FC<BackTestPositionsProps> = ({ robot, width }) => {
    const { timeframe, id: robotId } = robot;
    const [loading, setLoading] = useState(true);
    const signalCandleQueries = candleQueries(timeframe).backtest;

    const variables = { robotId };

    return (
        <div>
            {loading && (
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
        </div>
    );
};
