/* eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import dayjs from "libs/dayjs";
import { timeFrameFormat, color, VolumeDisplayUnits } from "./constants";
import { RobotStats } from "./types";
import { InputTypes, UnitsToTypes, volumes, VolumeTypesToLabelsMap } from "components/ui/Modals/types";
import { titleFromLowerCase } from "components/pages/ManagePage/backtests/utils";

const getNumber = (val: number | string) => Number(val.toString().replace(/[^0-9.-]+/g, ""));

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
export const getVolumeType = (settings) => (settings ? VolumeTypesToLabelsMap[settings.volumeType] : null);

export const getVolumeWithUnit = (settings, availableUnits: VolumeDisplayUnits) => {
    const volume = getVolume(settings);
    const isTypePercent = settings.volumeType === InputTypes.balancePercent;
    const displayUnits = isTypePercent ? "%" : availableUnits[UnitsToTypes[settings.volumeType]];
    return `${volume || 0} ${displayUnits || ""}`;
};

export const getUserSignalSettings = (signal) => signal?.user_signal_settings?.signal_settings || null;

export const getRobotSettings = (robot) => robot?.robot_settings?.robot_settings || null;

export const getUserRobotSettings = (user_robot) => user_robot?.user_robot_settings?.user_robot_settings || null;

export const getUserSignalVolume = (signal) => {
    return getVolume(getUserSignalSettings(signal));
};

export const getRobotVolume = (robot) => {
    return getVolume(getRobotSettings(robot));
};

export const getUserRobotVolume = (user_robot) => {
    return getVolume(getUserRobotSettings(user_robot));
};

export const round = (n: number, decimals = 0): number => +Number(`${Math.round(+`${n}e${decimals}`)}e-${decimals}`);

export const valueWithSign = (value: number | string): string => {
    const valAsNumber = getNumber(value);
    return valAsNumber > 0 ? `+${value}` : valAsNumber < 0 ? `${value}` : "0";
};

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

export const formatDateWithData = (date: string, addUTC = true): string => {
    if (!date) return "";
    const res = dayjs.utc(date).format("DD MMM YY");
    if (res === "Invalid date") return "";
    return addUTC ? `${res}` : res;
};

export const exchangeName = (code: string) => (code ? titleFromLowerCase(code) : code);

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

export const getColorForMoney = (value: number) => {
    const num = getNumber(formatMoney(value));
    return getColor(!(num > 0));
};
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
    const now = dayjs.utc();

    if (now.month() !== past.month() || now.date() !== past.date()) return formattedDate;

    const diff = dayjs.utc(now.diff(past));
    const { hours, minutes } = diff.toObject();

    if (hours >= 6) return formattedDate;

    if (!hours && !minutes) return "less than a minute ago";

    const hoursStr = `${(hours && `${hours} ${hours > 1 ? "hours" : "hour"}`) || ""}`;
    const minutesStr = `${(minutes && `${minutes} ${minutes > 1 ? "minutes" : "minute"}`) || ""}`;

    const timeFromNow = `${hours > 0 ? hoursStr : minutesStr} ago`;

    return timeFromNow;
};

export const getToUpperCase = (word) => word[0].toUpperCase() + word.slice(1);

export const getPriceTotalWithNoZero = (price) => {
    const zero = (price % 1).toString().split(".")[1] || "0";
    return zero === "0" || zero[0] === "0" ? price.toFixed() : price.toFixed(1);
};

export const getTimeCharge = (expires) => {
    const date1 = dayjs.utc(expires);
    const date2 = dayjs.utc();

    return date1.diff(date2, "m");
};
