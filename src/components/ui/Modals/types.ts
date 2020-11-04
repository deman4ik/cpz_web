export enum InputTypes {
    assetStatic = "assetStatic",
    currencyDynamic = "currencyDynamic"
}
export enum Units {
    USD = "USD",
    BTC = "BTC"
}
export enum UnitsToTypes {
    assetStatic = Units.BTC,
    currencyDynamic = Units.USD
}
export type Input = {
    type: InputTypes;
};

export enum volumes {
    assetStatic = "volume",
    currencyDynamic = "volumeInCurrency"
}
export type InputValues = {
    [InputTypes.assetStatic]?: string | number;
    [InputTypes.currencyDynamic]?: string | number;
};
