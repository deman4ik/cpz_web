import React, { memo, useState } from "react";

import { CandleChart } from "./CandleChart";
import { LoadingIndicator } from "components/common";
import { floatPositions } from "../helpers";
import { useFetchPositionData } from "./useFetchPositionData";
import { ClosedPositionContainer } from "./ClosedPositionContainer";
import { OpenPositionContainer } from "./OpenPositionContainer";
import styles from "./index.module.css";

interface Props {
    robotData: any;
    width: number;
}

const _TradingTabRobotPage: React.FC<Props> = ({ robotData, width }) => {
    const [isChartLoaded, setIsChartLoaded] = useState(false);
    const { user_signals: userSignals, robot } = robotData;
    const { isUserSignals } = robot;
    const {
        loading,
        handleLoadMore,
        isLoadingMore,
        dataOpenPositions,
        formatDataClosedPositions,
        formatSignals,
        quantyRecords
    } = useFetchPositionData(isUserSignals, userSignals, robot);

    return (
        <>
            <CandleChart robot={robot} signals={formatSignals} width={width} setIsChartLoaded={setIsChartLoaded} />
            {loading ? (
                <div className={styles.loading}>
                    <LoadingIndicator />
                </div>
            ) : !isChartLoaded ? (
                <div className={styles.empty} />
            ) : (
                <>
                    <div className={styles.container}>
                        {Object.keys(floatPositions).map((key) => (
                            <OpenPositionContainer
                                key={key}
                                robot={robot}
                                data={
                                    key === "signals"
                                        ? formatSignals
                                        : dataOpenPositions && dataOpenPositions.robot_positions.length
                                        ? dataOpenPositions.robot_positions
                                        : []
                                }
                                positionInfo={floatPositions[key]}
                            />
                        ))}
                    </div>
                    <ClosedPositionContainer
                        robot={robot}
                        handleLoadMore={handleLoadMore}
                        data={formatDataClosedPositions}
                        quantyRecords={quantyRecords}
                        isLoadingMore={isLoadingMore}
                        width={width}
                    />
                </>
            )}
        </>
    );
};

export const TradingTabRobotPage = memo(_TradingTabRobotPage);
