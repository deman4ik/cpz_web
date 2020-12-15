export interface ToolTip {
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    time: number;
}

export interface ToolTipArrow {
    tooltipTime: number;
    price: number;
    code: string;
    action: string;
    color: string;
    colorAction: string;
    volume: string;
    profit: number;
    exit: boolean;
}

export interface ToolTipArea {
    time: number;
    value: number;
}

export enum ChartType {
    candle,
    area,
    hybrid
}

export type ChartSize = {
    width: number;
    height: number;
};

export interface PropsLighweightChart {
    data: any;
    loading: boolean;
    markers?: any[];
    lines?: any[];
    onFetchMore?: (offset: number, signal?: AbortSignal) => void;
    size: ChartSize;
    type: ChartType;
    legend?: string;
    setIsChartLoaded: (isChartLoaded: boolean) => void;
}

export interface PropsWrapChart {
    data: any;
    loading?: boolean;
    fullWidth?: boolean;
    markers?: any[];
    lines?: any[];
    onFetchMore?: (offset: number, signal?: AbortSignal) => void;
    size: { width?: number; height: number };
    type: ChartType;
    legend?: string;
    setIsChartLoaded?: (isChartLoaded: boolean) => void;
}
