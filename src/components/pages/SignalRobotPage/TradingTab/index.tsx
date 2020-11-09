import React, { memo, useMemo, useState } from "react";

import { CandleChart, OpenPositionsList, ClosedPositionsList } from "./components";
import { LoadingIndicator } from "components/common";

import { floatPositions } from "../helpers";

import styles from "./index.module.css";

interface Props {
    data: any;
    robot: any;
    width: number;
}

const _TradingTab: React.FC<Props> = ({ data, robot, width }) => {
    const [isChartLoaded, setIsChartLoaded] = useState(false);
    const {
        loading,
        handleLoadMore,
        isLoadingMore,
        openPositions,
        closedPositions,
        signals,
        recordsCount
    } = useMemo(() => data, [data]);

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

export const TradingTab = memo(_TradingTab);
