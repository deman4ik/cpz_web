import React, { useMemo, useState, memo } from "react";
import dynamic from "next/dynamic";

import dayjs from "../../../libs/dayjs";
import { NoRecentData, LoadingIndicator } from "../../common";
import { ChartType } from "../../charts/LightWeightChart/types";
import { PerformanceTabComponent } from "./PerformanceTabComponent";
import { getRobotStatistic } from "./helpers";

interface Props {
    robot: any;
    width: number;
}

const LightWeightChartWithNoSSR = dynamic(() => import("../../charts/LightWeightChart"), {
    loading: () => <LoadingIndicator style={{ height: 400 }} />,
    ssr: false
});

const _PerformanceTabRobotPage: React.FC<Props> = ({ robot, width }) => {
    const [isChartLoaded, setIsChartLoaded] = useState(false);
    const chartData = useMemo(
        () =>
            !robot.fullStats?.equity
                ? null
                : robot.fullStats.equity.map((pos) => ({
                      time: dayjs.utc(pos.x / 1000).valueOf(),
                      value: pos.y
                  })),
        [robot]
    );

    const robotStatistics = useMemo(() => getRobotStatistic(robot.fullStats?.statistics), [robot]);
    return !robot ? (
        <LoadingIndicator />
    ) : !chartData ? (
        <NoRecentData message="No recent data available" style={{ marginTop: 20 }} />
    ) : (
        <>
            <LightWeightChartWithNoSSR
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
