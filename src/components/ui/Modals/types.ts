export enum InputTypes {
    assetStatic = "assetStatic",
    assetDynamicDelta = "assetDynamicDelta",
    currencyDynamic = "currencyDynamic",
    balancePercent = "balancePercent"
}
export enum Units {
    USD = "USD",
    BTC = "BTC",
    percent = "%"
}
export enum UnitsToTypes {
    assetStatic = Units.BTC,
    assetDynamicDelta = Units.BTC,
    currencyDynamic = Units.USD,
    balancePercent = Units.percent
}
export type Input = {
    type: InputTypes;
};

export enum volumes {
    assetStatic = "volume",
    assetDynamicDelta = "initialVolume",
    currencyDynamic = "volumeInCurrency",
    balancePercent = "balancePercent"
}
export type InputValues = {
    [InputTypes.assetStatic]?: string | number;
    [InputTypes.assetDynamicDelta]?: string | number;
    [InputTypes.currencyDynamic]?: string | number;
    [InputTypes.balancePercent]?: string | number;
};
export type VolumeTypeOption = {
    label: string;
    value: InputTypes;
};

export type InputMap = {
    [key in InputTypes]?: Input[];
};

export type Precision = { amount: number; price: number };

export type AmountType = { amount: number; amountUSD: number };

export type AssetType = {
    min: AmountType;
    max: AmountType;
};
export type RobotResult = {
    asset?: AssetType;
    price?: number;
    precision?: Precision;
    total_balance_usd?: number;
    used_balance_percent?: number;
};
