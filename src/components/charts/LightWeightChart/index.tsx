import React from "react";

import { _LightWeightChart as Chart } from "./LightWeightChart";
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
    setIsChartLoaded,
    fullWidth
}) => {
    const isMobile = size.width <= 480;
    const leftToolBar = size.width >= 1200 ? 190 : 46;
    const widthWithToolBar = 1214 + leftToolBar;
    const widthSubtractor = size.width >= widthWithToolBar ? 0 : widthWithToolBar - size.width;
    const max_width = fullWidth ? size.width : 1180;
    const countWidth = () => {
        if (fullWidth) return max_width;
        return isMobile ? size.width - 22 : 1180 - widthSubtractor;
    };
    return (
        <div className={styles.container} style={{ height: size.height }}>
            <Chart
                data={data}
                loading={loading}
                type={type}
                markers={markers}
                lines={lines}
                onFetchMore={onFetchMore}
                legend={legend}
                setIsChartLoaded={setIsChartLoaded}
                size={{ width: countWidth(), height: size.height }}
            />
        </div>
    );
};

export default LightWeightChart;
