import React from "react";
import { VictoryArea, VictoryContainer, VictoryChart, VictoryAxis } from "victory";

import styles from "./index.module.css";

interface AreaChartProps {
    data: any; // Todo any
    height: number;
}

const AreaChart: React.FC<AreaChartProps> = ({ data, height }) => {
    const randomId = Math.random();
    const arrX = data.map((d) => d.x);
    const arrY = data.map((d) => d.y);
    const coordsX = [Math.min(...arrX), Math.max(...arrX)];
    const coordsY = [Math.min(...arrY), Math.max(...arrY)];
    let domain;

    if (data.length <= 1) {
        domain = null;
    } else if (coordsY[0] === coordsY[1]) {
        domain = {
            x: coordsX,
            y: [coordsY[0] - 1, coordsY[1] + 1]
        };
    } else {
        domain = {
            x: coordsX,
            y: coordsY
        };
    }

    const positiveColor = "#69DACD";
    const negativeColor = "#CD3E60";

    const positiveGradientId = "gradient_pos";
    const negativeGradientId = "gradient_neg";

    return (
        <div className={styles.container}>
            <svg style={{ height: 0, width: 0 }}>
                <defs>
                    <linearGradient id={positiveGradientId} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={positiveColor} stopOpacity={0.6} />
                        <stop offset="60%" stopColor={positiveColor} stopOpacity={0.25} />
                        <stop offset="100%" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id={negativeGradientId} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopOpacity={0} />
                        <stop offset="60%" stopColor={negativeColor} stopOpacity={0.25} />
                        <stop offset="100%" stopColor={negativeColor} stopOpacity={0.1} />
                    </linearGradient>
                </defs>
            </svg>
            <VictoryChart>
                <VictoryAxis
                    style={{
                        axis: { stroke: "transparent" },
                        ticks: { stroke: "transparent" },
                        tickLabels: { fill: "transparent" }
                    }}
                />
                <VictoryArea
                    domain={domain}
                    containerComponent={<VictoryContainer style={{ position: "absolute" }} />}
                    height={height}
                    padding={0}
                    style={{
                        data: {
                            stroke: positiveColor,
                            fill: `url(#${positiveGradientId})`,
                            strokeWidth: 4,
                            clipPath: `url(#clip-path-pos-${randomId})`
                        }
                    }}
                    data={data}
                />
                <VictoryArea
                    domain={domain}
                    containerComponent={<VictoryContainer style={{ position: "absolute" }} />}
                    height={height}
                    padding={0}
                    style={{
                        data: {
                            stroke: negativeColor,
                            fill: `url(#${negativeGradientId})`,
                            strokeWidth: 4,
                            clipPath: `url(#clip-path-neg-${randomId})`
                        }
                    }}
                    data={data}
                />
                <CustomClip randomId={randomId} />
            </VictoryChart>
        </div>
    );
};

function CustomClip({ ...props }) {
    const { randomId } = props;
    return (
        <defs key="clips">
            <clipPath id={`clip-path-pos-${randomId}`}>
                <rect x="0" y="0" width="100%" height={props.scale.y(0)} />
            </clipPath>
            <clipPath id={`clip-path-neg-${randomId}`}>
                <rect x="0" y={props.scale.y(0)} width="100%" height="100%" />
            </clipPath>
        </defs>
    );
}

export default AreaChart;
