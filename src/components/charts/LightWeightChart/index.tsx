import React, { useEffect, useRef, useState } from "react";

import { _LightWeightChart as Chart } from "./LightWeightChart";
import styles from "./index.module.css";
import { PropsWrapChart } from "./types";

const getElementWidth = (el) => el.getBoundingClientRect().width;

const LightWeightChart: React.FC<PropsWrapChart> = ({
    data,
    size: { width, height },
    type,
    loading = false,
    markers,
    lines,
    onFetchMore,
    legend,
    setIsChartLoaded
}) => {
    const [availableWidth, setAvailableWidth] = useState(width || 0);

    const wrapperRef = useRef(null);

    useEffect(() => {
        function handleResize() {
            setAvailableWidth(getElementWidth(wrapperRef.current));
        }
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    });

    return (
        <div
            className={styles.container}
            style={{ width: "100%", height }}
            ref={(el) => {
                if (!el) return;
                wrapperRef.current = el;
                setAvailableWidth(getElementWidth(el));
            }}>
            <Chart
                data={data}
                loading={loading}
                type={type}
                markers={markers}
                lines={lines}
                onFetchMore={onFetchMore}
                legend={legend}
                setIsChartLoaded={setIsChartLoaded}
                size={{ width: availableWidth, height }}
            />
        </div>
    );
};

export default LightWeightChart;
