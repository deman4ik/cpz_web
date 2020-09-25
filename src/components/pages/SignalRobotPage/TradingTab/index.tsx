import React, { memo, useState } from "react";

import { CandleChart, OpenPositionsList, ClosedPositionsList } from "./components";
import { LoadingIndicator } from "components/common";

import { floatPositions } from "../helpers";
import { useFetchPositionData } from "./useFetchPositionData";

import styles from "./index.module.css";

interface Props {
    robotData: any;
    width: number;
}

const _TradingTabRobotPage: React.FC<Props> = ({ robotData, width }) => {
    const [isChartLoaded, setIsChartLoaded] = useState(false);
    const { user_signals: userSignals, robot } = robotData;
    const { isUserSubscribed } = robot;
    const {
        loading,
        handleLoadMore,
        isLoadingMore,
        openPositions,
        closedPositions,
        signals,
        recordsCount
    } = useFetchPositionData(isUserSubscribed, userSignals, robot);

    return (
        <>
            <CandleChart robot={robot} signals={signals} width={width} setIsChartLoaded={setIsChartLoaded} />
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
                            <OpenPositionsList
                                key={key}
                                robot={robot}
                                data={
                                    key === "signals"
                                        ? signals
                                        : openPositions && openPositions.length
                                        ? openPositions
                                        : []
                                }
                                positionInfo={floatPositions[key]}
                            />
                        ))}
                    </div>
                    <ClosedPositionsList
                        robot={robot}
                        handleLoadMore={handleLoadMore}
                        data={closedPositions}
                        recordsCount={recordsCount}
                        isLoadingMore={isLoadingMore}
                        width={width}
                    />
                </>
            )}
        </>
    );
};

export const TradingTabRobotPage = memo(_TradingTabRobotPage);
