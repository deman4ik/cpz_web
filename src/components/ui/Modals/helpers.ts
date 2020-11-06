import { formatMoney } from "config/utils";
import { InputTypes, InputValues, volumes } from "components/ui/Modals/types";
import { number } from "prop-types";

export const actionText = {
    start: "It is a realtime automated trading mode using your exchange account. Use is at your own risk.",
    delete: "You will lose your trading history for this robot.",
    stop:
        "If there are any open positions created by this robot, they will be cancelled (closed). This may potentially cause profit loss."
};

const getLimits = (data, type) => {
    const result = { asset: { min: { amount: 0, amountUSD: 0 }, max: { amount: 0, amountUSD: 0 } }, price: 0 };
    if (!(data.v_user_markets && data.v_user_markets.length)) return result;

    const { current_price, limits } = data.v_user_markets[0];

    if (current_price && limits && limits[type]) {
        result.asset = limits[type];
        result.price = current_price;
    }

    return result;
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
}
export const buildSettings = ({ volumeType, inputValues }: BuildSettingsProps) => {
    const result: SettingsType = { volumeType };
    result[volumes[volumeType]] = Number(inputValues[volumeType]);
    return result;
};

export const getLimitsForSignal = (data) => getLimits(data, "userSignal");

export const getLimitsForRobot = (data) => getLimits(data, "userRobot");

export const calculateCurrency = (asset: string | number, price: number): number => Number(asset) * price;

export const calculateAsset = (currency: string | number, price: number): number =>
    price === 0 ? 0 : Number(currency) / price;

export const formatNumber = (n: number): string => formatMoney(n, 6);

export const trimNumber = (n: number): string => Number(n.toFixed(6)).toString();

export const getAmtErrors = (val: string | number, minAmt: number, maxAmt: number): string | boolean => {
    if (Number(val) < minAmt) return `Minimal amount is ${minAmt}`;
    if (Number(val) > maxAmt) return `Max amount is ${maxAmt}`;

    return false;
};

export function parseLimits(limits: any): number[] {
    if (!(limits && limits.asset)) {
        return [];
    }
    const { price, asset } = limits;
    const { min, max } = asset;
    return [price, min.amount || 0, max.amount || 0, min.amountUSD || 0, max.amountUSD || 0];
}

const translateFunctions = {
    //from Type
    assetStatic: {
        //to Types
        balancePercent: ({ value }) => value, // IN PROGRESS
        assetDynamicDelta: ({ value }) => value, // same type
        currencyDynamic: ({ value, price }) => calculateCurrency(value, price) //translation to currencyDynamic function
    },
    assetDynamicDelta: {
        //to Types
        balancePercent: ({ value }) => value, // IN PROGRESS
        assetStatic: ({ value }) => value, // same type
        currencyDynamic: ({ value, price }) => calculateCurrency(value, price) //translation to currencyDynamic function
    },
    //from Type
    currencyDynamic: {
        //to Types
        balancePercent: ({ value }) => value, // IN PROGRESS
        assetStatic: ({ value, price }) => calculateAsset(value, price), //translation to assetStatic function
        assetDynamicDelta: ({ value, price }) => calculateAsset(value, price) //translation assetDynamicDelta function
    },
    balancePercent: {
        // assetStatic: ({ value }) => value, // IN PROGRESS
        // assetDynamicDelta: ({ value }) => value, // IN PROGRESS
        // currencyDynamic: ({ value }) => value // IN PROGRESS
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
    type: string;
    value: string | number;
    minAmount: string | number;
    maxAmount: string | number;
}

const validateCurrencies = ({ value, minAmount, maxAmount }) => getAmtErrors(value, minAmount, maxAmount);
const validateBalancePercent = ({ value }) => !(value >= 1 && value < 100);

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
type AmountType = {
    [InputTypes.assetStatic]: number;
    [InputTypes.currencyDynamic]: number;
};
export function getMinAmounts(parsedLimits): AmountType {
    const [, minAmount, , minAmountUSD] = parsedLimits;
    return { [InputTypes.assetStatic]: minAmount, [InputTypes.currencyDynamic]: minAmountUSD };
}
export function getMaxAmounts(parsedLimits): AmountType {
    const [, , maxAmount, , maxAmountUSD] = parsedLimits;
    return { [InputTypes.assetStatic]: maxAmount, [InputTypes.currencyDynamic]: maxAmountUSD };
}
