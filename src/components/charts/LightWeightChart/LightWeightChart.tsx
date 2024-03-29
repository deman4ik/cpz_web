/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef, useCallback } from "react";
import { createChart } from "lightweight-charts";
import { styles } from "./LightWeightChart.style";
import { toolTipTemplate, toolTipArrowTemplate, toolTipTemplateArea } from "./templates";
import { PropsLighweightChart, ChartType } from "./types";
import { color } from "config/constants";
import { getChartOptionsConfig, getLeftOffsetButton } from "./helpers";
import { debounce } from "lodash";
import { setStylesToRef } from "components/pages/helpers";

const toolTipWidth = 140;
const toolTipHeight = 80;
const toolTipMargin = 15;

const widthButton = 27;
const heightButton = 27;

const baseButtonOffset = 60;

export const _LightWeightChart: React.FC<PropsLighweightChart> = ({
    loading,
    data,
    markers,
    lines,
    onFetchMore,
    size,
    type,
    legend,
    setIsChartLoaded
}) => {
    const chartRef = useRef(null);
    const toolTipRef = useRef(null);
    const buttonRef = useRef(null);
    const legendRef = useRef(null);
    const subscribeRef = useRef(null);
    const [snapshotLoaded, setSnapshotLoaded] = useState(false);
    const [chart, setChart] = useState({ field: null, series: null });
    const [mouseEvent, setMouseEvent] = useState({ isDown: false, screenPos: 0, dragOffset: 0, chartOffset: 0 });
    const [linkLines, setLinkLines] = useState([]);
    const [sortedData, setSortedData] = useState([]);
    let debouncedHandleVisibleLogicalRangeChanged;
    const abortController = new window.AbortController();

    useEffect(() => {
        if (!data || !data.length) {
            return;
        }

        // data has to be sorted from old to new
        const sorted = [...data].sort((a, b) => {
            if (a.time < b.time) {
                return -1;
            }

            return 1;
        });
        setSortedData(sorted);
    }, [data]);

    useEffect(() => {
        const currentChart = createChart(chartRef.current, getChartOptionsConfig(size));

        let series;
        if (type === ChartType.candle) {
            series = currentChart.addCandlestickSeries({
                upColor: color.positive,
                downColor: color.negative,
                borderDownColor: color.negative,
                borderUpColor: color.positive,
                wickDownColor: color.negative,
                wickUpColor: color.positive,
                priceLineVisible: false
            });
            legendRef.current.innerText = legend;
        }

        if (type === ChartType.area) {
            series = currentChart.addAreaSeries({
                topColor: "rgba(21, 146, 230, 0.4)",
                bottomColor: "rgba(21, 146, 230, 0)",
                lineColor: "rgba(21, 146, 230, 1)",
                lineStyle: 0,
                lineWidth: 2,
                crosshairMarkerVisible: true,
                crosshairMarkerRadius: 2,
                priceLineVisible: false
            });
        }

        setStylesToRef(buttonRef, {
            color: "#4c525e",
            left: `${size.width - widthButton - baseButtonOffset}px`,
            top: `${size.height - heightButton - 30}px`
        });

        setChart({ field: currentChart, series });
        if (setIsChartLoaded) setIsChartLoaded(true);
    }, []);

    const setCurrentButtonLeft = (lastLine: any) => {
        const numberCheck = type === ChartType.area ? lastLine.value : lastLine.high;
        setStylesToRef(buttonRef, {
            left: `${size.width - widthButton - (baseButtonOffset + getLeftOffsetButton(numberCheck))}px`
        });
    };

    const handleCrosshairMoved = useCallback(
        (param) => {
            if (
                !param.time ||
                !param.point.y ||
                !param.point.x ||
                param.point.x < 0 ||
                param.point.x > size.width ||
                param.point.y < 0 ||
                param.point.y > size.height ||
                !subscribeRef.current
            ) {
                setStylesToRef(toolTipRef, { display: "none" });
                return;
            }
            const item = subscribeRef.current.sortedData.find((el) => el.time === param.time);
            if (!item) return;

            setStylesToRef(toolTipRef, { display: "block" });

            if (type === ChartType.candle) {
                if (param.hoveredMarkerId) {
                    const arrow = subscribeRef.current.markers.find((el) => el.id === param.hoveredMarkerId);
                    toolTipRef.current.innerHTML = toolTipArrowTemplate(arrow);
                } else {
                    toolTipRef.current.innerHTML = toolTipTemplate(item);
                }
            } else {
                toolTipRef.current.innerHTML = toolTipTemplateArea(item);
            }

            if (chart.series === null) {
                return;
            }
            const price = param.seriesPrices.get(chart.series);
            const coordinate = chart.series.priceToCoordinate(price);
            let toolTipCoordinateX = param.point.x - 0;
            if (coordinate === null) {
                return;
            }

            toolTipCoordinateX = Math.max(0, Math.min(chartRef.current.clientWidth - toolTipWidth, toolTipCoordinateX));
            const toolTipCoordinateY =
                coordinate - toolTipHeight - toolTipMargin > 0
                    ? coordinate - toolTipHeight - toolTipMargin
                    : Math.max(
                          0,
                          Math.min(
                              chartRef.current.clientHeight - toolTipHeight - toolTipMargin,
                              coordinate + toolTipMargin
                          )
                      );

            setStylesToRef(toolTipRef, { left: `${toolTipCoordinateX}px`, top: `${toolTipCoordinateY}px` });
        },
        [size.width, size.height]
    );

    const handleVisibleTimeRangeChange = () => {
        const buttonVisible = chart.field.timeScale().scrollPosition() < -5;
        setStylesToRef(buttonRef, { display: buttonVisible ? "block" : "none" });
    };

    const loadDataFromSource = (offset: number) => {
        if (onFetchMore) {
            onFetchMore(Math.floor(Math.abs(offset)), abortController.signal);
        }
    };

    const handleVisibleLogicalRangeChanged = (newVisibleLogicalRange) => {
        const barsInfo = chart.series.barsInLogicalRange(newVisibleLogicalRange);
        if (!loading && barsInfo !== null && barsInfo.barsBefore < 50) {
            loadDataFromSource(barsInfo.barsAfter);
        }
    };

    useEffect(() => {
        if (!(loading || !sortedData.length || !chart.series)) {
            if (snapshotLoaded) {
                setStylesToRef(chartRef, { cursor: "crosshair" });

                chart.series.setData(sortedData);
            } else {
                setSnapshotLoaded(true);
                chart.field.timeScale().subscribeVisibleTimeRangeChange(handleVisibleTimeRangeChange);
                debouncedHandleVisibleLogicalRangeChanged = debounce(handleVisibleLogicalRangeChanged, 500);
                chart.field.timeScale().subscribeVisibleLogicalRangeChange(debouncedHandleVisibleLogicalRangeChanged);
                chart.field.subscribeCrosshairMove(handleCrosshairMoved);

                chart.series.setData(sortedData);

                if (sortedData.length <= 120) {
                    chart.field.timeScale().setVisibleRange({
                        from: sortedData[0].time,
                        to: sortedData[sortedData.length - 1].time
                    });
                }
            }

            subscribeRef.current = { sortedData, markers };
            setCurrentButtonLeft(sortedData[sortedData.length - 1]);
            if (markers) {
                chart.series.setMarkers(markers);
            }
        }
        return () => {
            abortController.abort();
        };
    }, [sortedData, loading, chart.series]);

    useEffect(() => {
        if (lines && chart.series) {
            let newLinkLines = linkLines;
            if (linkLines.length) {
                for (let i = 0; i < linkLines.length; i++) {
                    chart.series.removePriceLine(linkLines[i]);
                }
                newLinkLines = [];
            }

            for (let i = 0; i < lines.length; i++) {
                const currentLine = lines[i];
                currentLine.lineStyle = 3;
                newLinkLines.push(chart.series.createPriceLine(currentLine));
            }
            setLinkLines(newLinkLines);
        }
    }, [lines, chart.series]);

    const handleOnClickBtn = () => {
        chart.field.timeScale().scrollToRealTime();
    };

    const handleOnMouseOver = () => {
        setStylesToRef(buttonRef, { color: "#000", background: "rgba(250, 250, 250, 1)" });
    };

    const handleOnMouseOut = () => {
        setStylesToRef(buttonRef, { color: "#4c525e", background: "rgba(250, 250, 250, 0.6)" });
    };

    const handleOnMouseDownCanvas = (e) => {
        e.preventDefault();
        setStylesToRef(chartRef, { cursor: "grab" });
        if (!sortedData.length) return;
        setMouseEvent({
            isDown: true,
            screenPos: e.screenX,
            dragOffset: 0,
            chartOffset: chart.field.timeScale().scrollPosition()
        });
    };

    const handleOnMouseMoveCanvas = (e) => {
        if (!mouseEvent.isDown) return;
        setStylesToRef(chartRef, { cursor: "grabbing" });
        const dragOffset = mouseEvent.screenPos - e.screenX;
        setMouseEvent((prev) => ({ ...prev, dragOffset }));
    };

    const handleOnMouseUpCanvas = () => {
        setMouseEvent({ isDown: false, screenPos: 0, dragOffset: 0, chartOffset: 0 });
        if (chartRef.current && chartRef.current.style.cursor !== "wait") {
            setStylesToRef(chartRef, { cursor: "crosshair" });
        }
    };

    useEffect(() => {
        if (chart.field) {
            chart.field.resize(size.width, size.height);
            if (sortedData.length) {
                setCurrentButtonLeft(sortedData[sortedData.length - 1]);
            }
        }
    }, [size.width, size.height]);

    return (
        <div
            onMouseDown={handleOnMouseDownCanvas}
            onMouseMove={handleOnMouseMoveCanvas}
            onMouseUp={handleOnMouseUpCanvas}
            style={styles.container}
            ref={chartRef}>
            <div style={styles.legend} ref={legendRef} />
            <div style={styles.toolTip} ref={toolTipRef} />
            <div
                onClick={handleOnClickBtn}
                onBlur={handleOnMouseOver}
                onFocus={handleOnMouseOut}
                style={styles.btn}
                ref={buttonRef}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" width="14" height="14">
                    <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth="2"
                        d="M6.5 1.5l5 5.5-5 5.5M3 4l2.5 3L3 10"
                    />
                </svg>
            </div>
        </div>
    );
};
