import React, { memo } from "react";
import dynamic from "next/dynamic";

import { ChartType } from "components/charts/LightWeightChart/types";
import { capitalize } from "config/utils";
import { PerformanceTabComponent } from "components/ui/PerformanceTab/PerformanceTabComponent";
import { LoadingIndicator } from "components/common";
import styles from "./index.module.css";

interface Props {
    formatData: any;
    title: string;
    width: number;
    fullWidth?: boolean;
    displayType: string;
    chartStyles?: any;
    tabStyles?: any;
}

const LightWeightChartWithNoSSR = dynamic(() => import("components/charts/LightWeightChart"), {
    loading: () => <LoadingIndicator />,
    ssr: false
});

const _StatsPageComponent: React.FC<Props> = ({ formatData, displayType, width, fullWidth, title }) => (
    <div className={styles.container}>
        {!formatData.chartData || !formatData.chartData.length ? (
            <LoadingIndicator />
        ) : (
            <LightWeightChartWithNoSSR
                data={formatData.chartData}
                type={ChartType.area}
                size={{ height: 470, width }}
                fullWidth={fullWidth}
            />
        )}
        <div className={styles.performanceTitle}>{title}</div>
        <PerformanceTabComponent width={width} robotStatistic={formatData.robotStatistic} />
    </div>
);

export const StatsPageComponent = memo(_StatsPageComponent);
