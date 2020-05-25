import dayjs from "../libs/dayjs";
import { timeFrameFormat, color } from "./constants";

export const moneyFormat = (value: number, toFixed = 2): string =>
    !value
        ? "0"
        : value
              .toFixed(toFixed)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

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
