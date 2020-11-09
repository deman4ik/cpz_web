import { PageType } from "config/types";

export interface CheckedFilters {
    asset: string | null;
    exchange: string | null;
}

export interface LabelCombinations {
    exchange: string[];
    asset: string[];
}
export enum QueueTypes {
    signals = "signal",
    robots = "userRobot"
}
