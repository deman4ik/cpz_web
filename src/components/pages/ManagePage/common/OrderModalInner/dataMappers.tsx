/*types*/
import { filterMapperSignature } from "./types";

export const TIMEFRAME_FORMAT = {
    1: "1m",
    5: "5m",
    15: "15m",
    30: "30m",
    60: "1h",
    120: "2h",
    240: "4h",
    480: "8h",
    720: "12h",
    1440: "1d"
};

export const TRADING_FORMATS = {
    false: "Not active",
    true: "Active"
};

/*Data mappers*/
export const underscoreMapper: filterMapperSignature = (item) => ({
    name: item.replace(/_/g, " "),
    active: false,
    filterValue: item
});

export const timeframeMapper: filterMapperSignature = (item) => ({
    name: TIMEFRAME_FORMAT[item],
    active: false,
    filterValue: item
});

export const tradingMapper: filterMapperSignature = (item) => ({
    name: TRADING_FORMATS[item],
    active: false,
    filterValue: item
});
