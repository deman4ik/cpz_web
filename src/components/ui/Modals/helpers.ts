import { formatMoney } from "config/utils";

export const actionText = {
    start: "It is a realtime automated trading mode using your exchange account and you use it at your own risk!",
    delete: "You will lost all trading history for this robot!",
    stop:
        "If there is any open positions created by this robot they will be canceled (closed) with current market prices and potentially may cause profit losses!"
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

export const buildSettings = ({ volumeType, volume, currency }) => ({
    volumeType,
    ...(volumeType === "assetStatic" ? { volume: Number(volume) } : { volumeInCurrency: Number(currency) })
});

export const getLimitsForSignal = (data) => getLimits(data, "userSignal");

export const getLimitsForRobot = (data) => getLimits(data, "userRobot");

export const calculateCurrency = (asset: string | number, price: number) => formatMoney(Number(asset) * price);

export const calculateAsset = (currency: string | number, price: number) =>
    price === 0 ? "0" : formatMoney(Number(currency) / price, 3);
