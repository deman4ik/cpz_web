import React, { useMemo, useState, memo } from "react";
import dynamic from "next/dynamic";

import dayjs from "../../../libs/dayjs";
import { NoRecentData, LoadingIndicator } from "../../common";
import { ChartType } from "../../charts/LightWeightChart/types";
import { PerformanceTabComponent } from "./PerformanceTabComponent";
import { getRobotStatistic } from "./helpers";

interface Props {
    fullStats: any;
    fullWidth?: boolean;
    width: number;
}

const LightWeightChartWithNoSSR = dynamic(() => import("../../charts/LightWeightChart"), {
    loading: () => <LoadingIndicator style={{ height: 400 }} />,
    ssr: false
});

const _PerformanceTabRobotPage: React.FC<Props> = ({ fullStats, width, fullWidth }) => {
    const [isChartLoaded, setIsChartLoaded] = useState(false);
    const chartData = useMemo(
        () =>
            !fullStats?.equity
                ? null
                : fullStats.equity.map((pos) => ({
                      time: dayjs.utc(pos.x / 1000).valueOf(),
                      value: pos.y
                  })),
        [fullStats]
    );

    const robotStatistics = useMemo(() => getRobotStatistic(fullStats?.statistics), [fullStats]);
    return !fullStats ? (
        <LoadingIndicator />
    ) : !chartData ? (
        <NoRecentData message="No recent data available" />
    ) : (
        <>
            <LightWeightChartWithNoSSR
                fullWidth={fullWidth}
                data={chartData}
                type={ChartType.area}
                size={{ height: 400, width }}
                setIsChartLoaded={setIsChartLoaded}
            />
            {!isChartLoaded && <div style={{ height: 400 }} />}
            <PerformanceTabComponent width={width} robotStatistic={robotStatistics} />
        </>
    );
};

export const PerformanceTab = memo(_PerformanceTabRobotPage);
