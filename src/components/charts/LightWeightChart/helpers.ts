import { color } from "config/constants";
import { ChartSize } from "./types";

export const getLeftOffsetButton = (lastValue: number): number =>
    lastValue ? (lastValue.toFixed(2).length - 7) * 6 : 0;

export const getChartOptionsConfig = (size: ChartSize) : any => ({
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
    rightPriceScale: {
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
