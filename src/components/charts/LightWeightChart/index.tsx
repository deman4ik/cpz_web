/* eslint-disable react/jsx-pascal-case */
import React from "react";

import { _LightWeightChart } from "./LightWeightChart";
import styles from "./index.module.css";
import { PropsWrapChart } from "./types";

const LightWeightChart: React.FC<PropsWrapChart> = ({
    data,
    size,
    type,
    loading = false,
    markers,
    lines,
    onFetchMore,
    legend,
    setIsChartLoaded
}) => {
    const isMobile = size.width <= 480;
    const leftToolBar = size.width >= 1200 ? 190 : 46;
    const widthWithToolBar = 1214 + leftToolBar;
    const widthSubtractor = size.width >= widthWithToolBar ? 0 : widthWithToolBar - size.width;

    return (
        <div className={styles.container}>
            <_LightWeightChart
                data={data}
                loading={loading}
                type={type}
                markers={markers}
                lines={lines}
                onFetchMore={onFetchMore}
                legend={legend}
                setIsChartLoaded={setIsChartLoaded}
                size={{ width: isMobile ? size.width - 22 : 1180 - widthSubtractor, height: size.height }}
            />
        </div>
    );
};

export default LightWeightChart;
