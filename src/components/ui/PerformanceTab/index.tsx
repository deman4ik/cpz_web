import React, { useMemo, useState, memo } from "react";
import dynamic from "next/dynamic";
import dayjs from "libs/dayjs";
import { NoRecentData, LoadingIndicator } from "components/common";
import { ChartType } from "components/charts/LightWeightChart/types";
import { PerformanceTabComponent } from "./PerformanceTabComponent";
import { getRobotStatistic } from "./helpers";

interface Props {
    fullStats: any;
    fullWidth?: boolean;
}

const LightWeightChartWithNoSSR = dynamic(() => import("components/charts/LightWeightChart"), {
    loading: () => <LoadingIndicator style={{ height: 400 }} />,
    ssr: false
});

const _PerformanceTabRobotPage: React.FC<Props> = ({ fullStats, fullWidth }) => {
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
    return !fullStats || Object.keys(fullStats).length === 0 ? (
        <NoRecentData message="No recent data available" />
    ) : (
        <>
            <LightWeightChartWithNoSSR
                fullWidth={fullWidth}
                data={chartData}
                type={ChartType.area}
                size={{ height: 400 }}
                setIsChartLoaded={setIsChartLoaded}
            />
            {!isChartLoaded && <div style={{ height: 400 }} />}
            <PerformanceTabComponent robotStatistic={robotStatistics} />
        </>
    );
};

export const PerformanceTab = memo(_PerformanceTabRobotPage);
