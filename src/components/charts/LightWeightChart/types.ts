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

export interface PropsLighweightChart {
  data: any;
  loading: boolean;
  markers?: any[];
  lines?: any[];
  onFetchMore?: (offset: number) => void;
  size: {
    width: number;
    height: number;
  };
  type: ChartType;
  legend?: string;
}

export interface PropsWrapChart {
  data: any;
  loading?: boolean;
  markers?: any[];
  lines?: any[];
  onFetchMore?: (offset: number) => void;
  height: number;
  type: ChartType;
  legend?: string;
}
