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
