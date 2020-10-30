import { formatMoney } from "config/utils";

export const actionText = {
    start: "It is a realtime automated trading mode using your exchange account. Use is at your own risk.",
    delete: "You will lose your trading history for this robot.",
    stop:
        "If there are any open positions created by this robot, they will be cancelled (closed). This may potentially cause profit loss."
};

export const volumeTypeOptions = [
    {
        label: "Fixed to asset",
        value: "assetStatic"
    },
    {
        label: "Fixed to currency",
        value: "currencyDynamic"
    }
];

const getLimits = (data, type) => {
    const result = { asset: { min: { amount: 0, amountUSD: 0 }, max: { amount: 0, amountUSD: 0 } }, price: 0 };
    if (!data.v_user_markets) return result;

    const { current_price, limits } = data.v_user_markets[0];

    if (current_price && limits && limits[type]) {
        result.asset = limits[type];
        result.price = current_price;
    }

    return result;
};

export const buildSettings = ({ volumeType, volume, volumeInCurrency }) => ({
    volumeType,
    ...(volumeType === "assetStatic" ? { volume: Number(volume) } : { volumeInCurrency: Number(volumeInCurrency) })
});

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
