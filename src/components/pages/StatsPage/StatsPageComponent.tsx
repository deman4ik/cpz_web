import React, { memo } from "react";
import dynamic from "next/dynamic";

import { ChartType } from "components/charts/LightWeightChart/types";
import { PerformanceTabComponent } from "components/ui/PerformanceTab/PerformanceTabComponent";
import { LoadingIndicator } from "components/common";
import styles from "./index.module.css";

interface Props {
    formatData: any;
    title: string;
    displayType: string;
}

const LightWeightChartWithNoSSR = dynamic(() => import("components/charts/LightWeightChart"), {
    loading: () => <LoadingIndicator />,
    ssr: false
});

const _StatsPageComponent: React.FC<Props> = ({ formatData, displayType, title }) => (
    <div className={styles.container}>
        {!formatData.chartData || !formatData.chartData.length ? (
            <LoadingIndicator />
        ) : (
            <LightWeightChartWithNoSSR data={formatData.chartData} type={ChartType.area} size={{ height: 470 }} />
        )}
        <div className={styles.performanceTitle}>{title}</div>
        <PerformanceTabComponent robotStatistic={formatData.robotStatistic} />
    </div>
);

export const StatsPageComponent = memo(_StatsPageComponent);
