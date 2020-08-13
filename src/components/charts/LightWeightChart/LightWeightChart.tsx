/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef, useCallback } from "react";
import { createChart } from "lightweight-charts";
import { styles } from "./LightWeightChart.style";
import { toolTipTemplate, toolTipArrowTemplate, toolTipTemplateArea } from "./templates";
import { PropsLighweightChart, ChartType } from "./types";
import { color } from "config/constants";
import { getLeftOffsetButton } from "./helpers";

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
    const subscibeRef = useRef(null);
    const [fetchData, setFetchData] = useState(false);
    const [chart, setChart] = useState({ field: null, series: null });
    const [mouseEvent, setMouseEvent] = useState({ isDown: false, screenPos: 0, dragOffset: 0, chartOffset: 0 });
    const [linkLines, setLinkLines] = useState([]);

    useEffect(() => {
        const currentCart = createChart(chartRef.current, {
            width: size.width,
            height: size.height,
            layout: {
                backgroundColor: color.dark,
                textColor: color.accent
            },
            grid: {
                vertLines: {
                    color: "#38466a"
                },
                horzLines: {
                    color: "#38466a"
                }
            },
            crosshair: {
                mode: 0,
                vertLine: {
                    labelBackgroundColor: color.accent,
                    color: color.accent
                },
                horzLine: {
                    labelBackgroundColor: color.accent,
                    color: color.accent
                }
            },
            priceScale: {
                borderColor: "#38466a",
                borderVisible: true
            },
            timeScale: {
                timeVisible: true,
                secondsVisible: false,
                borderColor: "#38466a"
            },
            localization: {
                locale: "en-US"
            }
        });

        let series;
        if (type === ChartType.candle) {
            series = currentCart.addCandlestickSeries({
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
            series = currentCart.addAreaSeries({
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

        buttonRef.current.style.left = `${size.width - widthButton - baseButtonOffset}px`;
        buttonRef.current.style.top = `${size.height - heightButton - 30}px`;
        buttonRef.current.style.color = "#4c525e";

        setChart({ field: currentCart, series });
        if (setIsChartLoaded) setIsChartLoaded(true);
    }, []);

    const setCurrentButtonLeft = (lastLine: any) => {
        const numberCheck = type === ChartType.area ? lastLine.value : lastLine.high;
        buttonRef.current.style.left = `${
            size.width - widthButton - (baseButtonOffset + getLeftOffsetButton(numberCheck))
        }px`;
    };

    const handleCrosshairMoved = useCallback((param) => {
        if (
            !param.time ||
            !param.point.y ||
            !param.point.x ||
            param.point.x < 0 ||
            param.point.x > size.width ||
            param.point.y < 0 ||
            param.point.y > size.height ||
            !subscibeRef.current
        ) {
            toolTipRef.current.style.display = "none";
            return;
        }
        const item = subscibeRef.current.data.find((el) => el.time === param.time);
        if (!item) return;

        const { y, x } = param.point;
        toolTipRef.current.style.display = "block";

        if (type === ChartType.candle) {
            if (param.hoveredMarkerId) {
                const arrow = subscibeRef.current.markers.find((el) => el.id === param.hoveredMarkerId);
                toolTipRef.current.innerHTML = toolTipArrowTemplate(arrow);
            } else {
                toolTipRef.current.innerHTML = toolTipTemplate(item);
            }
        } else {
            toolTipRef.current.innerHTML = toolTipTemplateArea(item);
        }

        let left = x + toolTipMargin;
        if (left > size.width - toolTipWidth) {
            left = x - toolTipMargin - toolTipWidth;
        }

        let top = y + toolTipMargin;
        if (top > size.height - toolTipHeight) {
            top = y - toolTipHeight - toolTipMargin;
        }

        toolTipRef.current.style.left = `${left}px`;
        toolTipRef.current.style.top = `${top}px`;
    }, []);

    const loadDataFromSource = (offset: number) => {
        if (!onFetchMore) return;
        onFetchMore(Math.round(offset));
    };

    const handleVisibleTimeRangeChange = () => {
        const buttonVisible = chart.field.timeScale().scrollPosition() < -5;
        buttonRef.current.style.display = buttonVisible ? "block" : "none";
    };

    useEffect(() => {
        if (!loading && data && data.length && chart.series) {
            if (!fetchData) {
                setFetchData(true);
                chart.field.subscribeVisibleTimeRangeChange(handleVisibleTimeRangeChange);
                chart.field.subscribeCrosshairMove(handleCrosshairMoved);
            } else {
                chartRef.current.style.cursor = "crosshair";
            }
            chart.series.setData(data);
            if (data.length <= 120) {
                chart.field.timeScale().setVisibleRange({
                    from: data[0].time,
                    to: data[data.length - 1].time
                });
            }
            subscibeRef.current = { data, markers };
            setCurrentButtonLeft(data[data.length - 1]);
            if (markers) {
                chart.series.setMarkers(markers);
            }
        }
    }, [data, loading, chart.series]);

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
        buttonRef.current.style.background = "rgba(250, 250, 250, 1)";
        buttonRef.current.style.color = "#000";
    };

    const handleOnMouseOut = () => {
        buttonRef.current.style.background = "rgba(250, 250, 250, 0.6)";
        buttonRef.current.style.color = "#4c525e";
    };

    const handleOnMouseDownCanvas = (e) => {
        e.preventDefault();
        chartRef.current.style.cursor = "grab";
        if (!data) return;
        setMouseEvent({
            isDown: true,
            screenPos: e.screenX,
            dragOffset: 0,
            chartOffset: chart.field.timeScale().scrollPosition()
        });
    };

    const handleOnMouseMoveCanvas = (e) => {
        if (!mouseEvent.isDown) return;
        chartRef.current.style.cursor = "grabbing";
        const dragOffset = mouseEvent.screenPos - e.screenX;
        setMouseEvent((prev) => ({ ...prev, dragOffset }));
    };

    const handleOnMouseUpCanvas = () => {
        if (mouseEvent.dragOffset !== 0 && !loading) {
            const vr = chart.field.timeScale().getVisibleRange();
            if (data[0].time === vr.from) {
                chartRef.current.style.cursor = "wait";
                loadDataFromSource(-1 * (chart.field.timeScale().scrollPosition() - mouseEvent.chartOffset));
            }
        }
        setMouseEvent({ isDown: false, screenPos: 0, dragOffset: 0, chartOffset: 0 });
        if (chartRef.current.style.cursor !== "wait") {
            chartRef.current.style.cursor = "crosshair";
        }
    };

    useEffect(() => {
        if (chart.field) {
            chart.field.resize(size.width, size.height);
            if (data && data.length) {
                setCurrentButtonLeft(data[data.length - 1]);
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
