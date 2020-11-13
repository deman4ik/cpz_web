/* eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import dayjs from "../libs/dayjs";
import { timeFrameFormat, color, VolumeDisplayUnits } from "./constants";
import { RobotStats } from "./types";
import { UnitsToTypes, volumes } from "components/ui/Modals/types";

export const formatMoney = (value: number, fractionDigits = 2): string => {
    let val = "0";

    if (value) {
        val = new Intl.NumberFormat("en-US", {
            maximumFractionDigits: fractionDigits
        }).format(value);
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

export const getVolume = (settings) => (settings ? settings[volumes[settings.volumeType]] : null);
export const getVolumeType = (settings) => (settings ? settings.volumeType : null);

export const getVolumeWithUnit = (settings, availableUnits: VolumeDisplayUnits) => {
    const volume = getVolume(settings);
    const displayUnits = UnitsToTypes[settings.volumeType];
    return `${volume} ${displayUnits || ""}`;
};

export const getUserSignalVolume = (signal) => {
    if (!signal?.user_signal_settings?.signal_settings) return null;
    return getVolume(signal.user_signal_settings.signal_settings);
};

export const getRobotVolume = (robot) => {
    if (!robot?.robot_settings?.robot_settings) return null;
    return getVolume(robot.robot_settings.robot_settings);
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

export const buildRobotSettings = ({ volumeType, volume, currency }) => ({
    volumeType,
    ...(volumeType === "assetStatic" ? { volume: Number(volume) } : { volumeInCurrency: Number(currency) })
});

export const getTimeFromNow = (d: string): string => {
    const formattedDate = formatDate(d);
    if (formattedDate === "") return "";

    const past = dayjs.utc(d);
    const now = dayjs();

    if (now.month() !== past.month() || now.date() !== past.date()) return formattedDate;

    const diff = dayjs(now.diff(past));
    const { hours, minutes } = diff.toObject();

    if (hours >= 6) return formattedDate;

    if (!hours && !minutes) return "less than a minute ago";

    const timeFromNow = `${(hours && `${hours} ${hours > 1 ? "hours" : "hour"}`) || ""} 
    ${(minutes && `${minutes} ${minutes > 1 ? "minutes" : "minute"}`) || ""} ago`;

    return timeFromNow;
};
