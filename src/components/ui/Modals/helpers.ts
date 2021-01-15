import { formatMoney } from "config/utils";
import { InputTypes, InputValues, Precision, RobotResult, volumes } from "components/ui/Modals/types";
import { LimitsType } from "../../../types";

export const actionText = {
    start: "It is a realtime automated trading mode using your exchange account. Use is at your own risk.",
    delete: "You will lose your trading history for this robot.",
    stop:
        "If there are any open positions created by this robot, they will be cancelled (closed). This may potentially cause profit loss."
};
export const precisionToVolumeMap = {
    [InputTypes.assetDynamicDelta]: "amount",
    [InputTypes.assetStatic]: "amount",
    [InputTypes.currencyDynamic]: "price"
};
export const DEFAULT_PRECISION = { price: 1, amount: 8 };

function parseRobotResult(data, type) {
    const result: RobotResult = {};
    const { v_user_exchange_accs } = data || {};
    if (!(v_user_exchange_accs && v_user_exchange_accs.length)) return result;

    const { amounts, total_balance_usd, user } = v_user_exchange_accs[0];

    const { markets } = user;

    if (markets && markets.length) {
        const { current_price, limits, precision } = markets[0];
        result.asset = limits[type];
        result.price = current_price;
        result.precision = precision;
    }
    result.total_balance_usd = total_balance_usd;
    result.used_balance_percent = amounts?.used_balance_percent || 0;
    result.available_balance_percent = amounts?.available_balance_percent || 0;

    return result;
}
export const limitsPropToType = {
    signals: "userSignal",
    robots: "userRobot"
};
function parseSignalResult(data, type) {
    const { v_user_markets: markets } = data;
    if (!(markets && markets.length)) return {};

    const { limits, ...rest } = markets[0];
    return {
        ...rest,
        asset: limits[type]
    };
}
export const getLimits = (data, type) => {
    const result = {
        total_balance_usd: 0,
        used_balance_percent: 0,
        asset: { min: { amount: 0, amountUSD: 0 }, max: { amount: 0, amountUSD: 0 } },
        price: 0,
        precision: DEFAULT_PRECISION
    };
    let parsedData;
    if (type === limitsPropToType.robots) {
        parsedData = parseRobotResult(data, type);
    } else if (type === limitsPropToType.signals) {
        parsedData = parseSignalResult(data, type);
    }
    return { ...result, ...parsedData };
};
type SettingsType = {
    volumeType: string;
    volume?: number;
    volumeInCurrency?: number;
    initialVolume?: number;
    balancePercent?: number;
};
interface BuildSettingsProps {
    volumeType: InputTypes;
    inputValues: InputValues;
    precision: Precision;
}

export const buildSettings = ({ volumeType, inputValues, precision }: BuildSettingsProps) => {
    const result: SettingsType = { volumeType };
    result[volumes[volumeType]] = Number(
        Number(inputValues[volumeType]).toFixed(precision[precisionToVolumeMap[volumeType]])
    );
    return result;
};

export const getLimitsForSignal = (data) => getLimits(data, "userSignal");

export const getLimitsForRobot = (data) => getLimits(data, "userRobot");

export const calculateCurrency = (asset: string | number, price: number): number => Number(asset) * price;

export const calculateAsset = (currency: string | number, price: number): number =>
    price === 0 ? 0 : Number(currency) / price;

export const getPercent = (amountUSD, balance) => Math.ceil((amountUSD / balance) * 100);

export const formatNumber = (n: number, precision?: number): string => formatMoney(n, precision || 6);

export const trimNumber = (n: number): string => Number(n.toFixed(6)).toString();

export const roundWithPrecision = (number: number, precision: number) => {
    if (precision === 1) {
        return Math.floor(number * 10) / 10;
    }
    return Number(number.toFixed(precision));
};
export const getAmtErrors = (
    val: string | number,
    minAmt: number,
    maxAmt: number,
    precision: number,
    unit = "amount"
): string | boolean => {
    if (Number(val) < minAmt) return `Minimal ${unit} is ${roundWithPrecision(minAmt, precision)}`;
    if (Number(val) > maxAmt) return `Max ${unit} is ${roundWithPrecision(maxAmt, precision)}`;

    return false;
};
export type ParsedLimits = {
    price?: number;
    minAmount?: number;
    maxAmount?: number;
    minAmountUSD?: number;
    maxAmountUSD?: number;
    balance?: number;
    maxPercentAmount?: number;
    usedBalancePercent?: number;
    availableBalancePercent?: number;
};
export function parseLimits(limits: LimitsType): ParsedLimits {
    if (!(limits && limits.asset)) {
        return {};
    }
    const { price, asset } = limits;
    const { min, max } = asset;
    return {
        price,
        minAmount: min.amount || 0,
        maxAmount: max.amount || 0,
        minAmountUSD: min.amountUSD || 0,
        maxAmountUSD: max.amountUSD || 0,
        balance: limits.total_balance_usd,
        maxPercentAmount: max.balancePercent,
        usedBalancePercent: limits.used_balance_percent,
        availableBalancePercent: limits.available_balance_percent
    };
}

const calculateCurrencyFromPercent = (percent, balance) => (Number(percent) * balance) / 100;
const translateFunctions = {
    //from Type
    assetStatic: {
        //to Types
        assetDynamicDelta: ({ value }) => Number(value),
        balancePercent: ({ value, price, balance }) => getPercent(calculateCurrency(value, price), balance),
        currencyDynamic: ({ value, price }) => calculateCurrency(value, price)
    },
    assetDynamicDelta: {
        //to Types
        currencyDynamic: ({ value, price }) => calculateCurrency(value, price),
        assetStatic: ({ value }) => Number(value),
        balancePercent: ({ value, price, balance }) => getPercent(calculateCurrency(value, price), balance)
    },
    //from Type
    currencyDynamic: {
        //to Types
        assetStatic: ({ value, price }) => calculateAsset(value, price),
        assetDynamicDelta: ({ value, price }) => calculateAsset(value, price),
        balancePercent: ({ value, balance }) => getPercent(value, balance)
    },
    balancePercent: {
        assetStatic: ({ value, balance, price }) => calculateAsset(calculateCurrencyFromPercent(value, balance), price),
        assetDynamicDelta: ({ value, balance, price }) =>
            calculateAsset(calculateCurrencyFromPercent(value, balance), price),
        currencyDynamic: ({ value, balance }) => calculateCurrencyFromPercent(value, balance)
    }
};

export function translateValue(args: any, fromType: string, toType: string): number {
    const computeFunction = translateFunctions[fromType][toType];
    if (computeFunction) {
        return computeFunction(args);
    }
    return 0;
}

interface ValidateVolumeProps {
    precision: number;
    used_percent: number;
    type: string;
    value: string | number;
    minAmount: string | number;
    maxAmount: string | number;
}

const validateCurrencies = ({ value, minAmount, maxAmount, precision }) =>
    getAmtErrors(value, minAmount, maxAmount, precision);

const validateBalancePercent = ({ value, maxAmount = 100, minAmount = 0 }) => {
    return getAmtErrors(value, minAmount, maxAmount, 0, "percent");
};

const validationFunctions = {
    assetStatic: validateCurrencies,
    assetDynamicDelta: validateCurrencies,
    currencyDynamic: validateCurrencies,
    balancePercent: validateBalancePercent
};
export function validateVolume({ type, ...rest }: ValidateVolumeProps) {
    const validateFunction = validationFunctions[type];
    return validateFunction(rest);
}
export const getInputValues = (assetStatic?, currencyDynamic?, assetDynamicDelta?, balancePercent?) => ({
    assetStatic,
    assetDynamicDelta,
    currencyDynamic,
    balancePercent
});

type AmountType = {
    [InputTypes.assetStatic]: number;
    [InputTypes.currencyDynamic]: number;
};
export const AssetTypes = [InputTypes.assetDynamicDelta, InputTypes.assetStatic];
export const CurrencyTypes = [InputTypes.currencyDynamic, InputTypes.balancePercent];

export enum Pages {
    robot = "robot",
    signals = "signals",
    signal = "signal"
}

const routesToPagesMap = {
    "/robots/robot/[code]": Pages.robot,
    "/signals": Pages.signals,
    "/signals/robot/[code]": Pages.signal
};

export const currentPage = (path: string) => routesToPagesMap[path];

export const isObjectEmpty = (obj) => Object.values(obj).filter((i) => i === 0 || !!i).length === 0;
