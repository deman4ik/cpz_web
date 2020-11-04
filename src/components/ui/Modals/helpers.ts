import { formatMoney } from "config/utils";
import { InputTypes } from "components/ui/Modals/types";

export const actionText = {
    start: "It is a realtime automated trading mode using your exchange account. Use is at your own risk.",
    delete: "You will lose your trading history for this robot.",
    stop:
        "If there are any open positions created by this robot, they will be cancelled (closed). This may potentially cause profit loss."
};

export const volumeTypeOptions = [
    {
        label: "Fixed to asset",
        value: InputTypes.assetStatic
    },
    {
        label: "Fixed to currency",
        value: InputTypes.currencyDynamic
    }
];

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
};
export const buildSettings = ({ volumeType, inputValues }) => {
    const result: SettingsType = { volumeType };
    if (volumeType === InputTypes.assetStatic) {
        result.volume = Number(inputValues[InputTypes.assetStatic]);
    } else {
        result.volumeInCurrency = Number(inputValues[InputTypes.currencyDynamic]);
    }
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

export function parseLimits(limits: any) {
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
        currencyDynamic: ({ value, price }) => calculateCurrency(value, price) //translation function
    },
    //from Type
    currencyDynamic: {
        //to Types
        assetStatic: ({ value, price }) => calculateAsset(value, price) //translation function
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

const validationFunctions = {
    assetStatic: validateCurrencies,
    currencyDynamic: validateCurrencies
};
export function validateVolume({ type, ...rest }: ValidateVolumeProps) {
    const validateFunction = validationFunctions[type];
    return validateFunction(rest);
}

export function getMinAmounts(parsedLimits) {
    const [, minAmount, , minAmountUSD] = parsedLimits;
    return { [InputTypes.assetStatic]: minAmount, [InputTypes.currencyDynamic]: minAmountUSD };
}
export function getMaxAmounts(parsedLimits) {
    const [, , maxAmount, , maxAmountUSD] = parsedLimits;
    return { [InputTypes.assetStatic]: maxAmount, [InputTypes.currencyDynamic]: maxAmountUSD };
}
