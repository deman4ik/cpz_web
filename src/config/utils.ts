/* eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import dayjs from "../libs/dayjs";
import { timeFrameFormat, color, VolumeDisplayUnits } from "./constants";
import { RobotStats } from "./types";

export const formatMoney = (value: number, toFixed = 2): string => {
    let val = "0";

    if (value) {
        if (value.toString().match(/^0|-0\./g) && toFixed === 2) {
            val = value.toFixed(6).toString().replace(/0*$/, ""); // display up to 6 decimals
        } else {
            val = value
                .toFixed(toFixed)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    }
    return val;
};

export const getStats = (robot): RobotStats => {
    const { equity, profit, winRate, maxDrawdown, tradesCount } = robot.stats || robot.fullStats || {};

    return {
        equity: equity || [],
        profit: profit || 0,
        winRate: winRate || null,
        maxDrawdown: maxDrawdown || null,
        tradesCount: tradesCount || null
    };
};

export const getVolume = (settings) =>
    settings ? (settings.volumeType === "assetStatic" ? settings.volume : settings.volumeInCurrency) : null;

export const getVolumeWithUnit = (settings, availableUnits: VolumeDisplayUnits) => {
    const volume = getVolume(settings);
    const displayUnits = settings.volumeType === "currencyDynamic" ? availableUnits.currency : availableUnits.asset;
    return `${volume} ${displayUnits || ""}`;
};

export const round = (n: number, decimals = 0): number => +Number(`${Math.round(+`${n}e${decimals}`)}e-${decimals}`);

export const valueWithSign = (value: number | string): string => (Number(value) > 0 ? `+${value}` : `${value}`);

export const capitalize = (s: string) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
};

export const splitCapitaize = (s: string): string =>
    capitalize(s)
        .split(/(?=[A-Z])/)
        .join(" ");

export const formatDate = (date: string, addUTC = true): string => {
    if (!date) return "";
    const res = dayjs.utc(date).format("DD MMM YY HH:mm");
    if (res === "Invalid date") return "";
    return addUTC ? `${res} UTC` : res;
};

export const exchangeName = (code: string) =>
    code
        ? code
              .split("_")
              .map((word) => capitalize(word))
              .join(" ")
        : code;

export const getLegend = (robot) =>
    `${exchangeName(robot.exchange)} ${robot.asset}/${robot.currency} ${timeFrameFormat[robot.timeframe].abbr}`;

export const roundFormat = (value: number): number => Math.round(value * 100) / 100;

export const colorAction = (check: boolean): any => ({
    color: check ? color.positive : color.negative
});
export const colorDirection = (direction: string): any => ({
    color: ["long", "closeShort"].includes(direction) ? color.positive : color.negative
});

export const getColor = (condition: boolean) => (condition ? color.negative : color.positive);
export const getIconName = (direction: string) => (direction === "short" ? "arrowdown" : "arrowup");
export const getIconNameAction = (check: boolean) => (!check ? "arrowdown" : "arrowup");

export const truncate = (str: string, maxLength: number) => {
    if (str.length <= maxLength) return str;

    let subString = str.substr(0, maxLength - 1);
    subString = subString.substr(0, subString.lastIndexOf(" "));

    return `${subString}...`;
};

export const getHash = (length) => {
    const radom13chars = () => Math.random().toString(16).substring(2, 15);
    const loops = Math.ceil(length / 13);
    return new Array(loops)
        .fill(radom13chars)
        .reduce((string, func) => string + func(), "")
        .substring(0, length);
};

export const getSearchProps = (data, displayType) => {
    let result = null;
    if (data && data.SearchProps.props) {
        result = data.SearchProps.props.find((el) => el.type === displayType);
    }
    return result;
};
