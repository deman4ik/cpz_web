import { ReactNode } from "react";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { DeviceContextType } from "providers/deviceContext";

// export type NextPageProps = any;
export type NextPageProps = Partial<{
    children: ReactNode;
    accessToken: string;
    apollo: ApolloClient<NormalizedCacheObject>;
    device: DeviceContextType;
}>;

export type RobotDataType = {
    ChartData: {
        limit: number;
        robotId: string;
        timeframe: number;
        __typename: string;
    };
    robot: {
        cache: {
            id: string;
            tableName: string;
            __typename: string;
        };
        code: string;
        id: string;
        name: string;
        subs: {
            asset: string;
            currency: string;
            exchange: string;
            settings: {
                balancePercent?: number;
                initialVolume?: number;
                volumeInCurrency?: number;
                volume?: number;
                volumeType: InputTypes;
                __typename: string;
            };
        };
        userRobotId: string | null;
        user_ex_acc_id: string;
        __typename: string;
    };
};

export type LimitsType = {
    asset: {
        max: {
            amount: number;
            amountUSD: number;
            balancePercent?: number;
        };
        min: {
            amount: number;
            amountUSD: number;
        };
    };
    available_balance_percent?: number;
    precision?: {
        amount: number;
        price: number;
    };
    price: number;
    total_balance_usd: number;
    used_balance_percent: number;
};

export type ResultType = {
    v_user_markets: [
        {
            limits: {
                userRobot: {
                    max: {
                        amount: number;
                        amountUSD: number;
                        balancePercent?: number;
                    };
                    min: {
                        amount: number;
                        amountUSD: number;
                    };
                };
                userSignal: {
                    max: {
                        amount: number;
                        amountUSD: number;
                        balancePercent?: number;
                    };
                    min: {
                        amount: number;
                        amountUSD: number;
                    };
                };
            };
        }
    ];
};

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
    assetStatic = "asset",
    assetDynamicDelta = "asset",
    currencyDynamic = "currency",
    balancePercent = "percent"
}

export enum VolumeTypesToLabelsMap {
    assetStatic = "Fixed to asset",
    assetDynamicDelta = "Dynamic asset",
    currencyDynamic = "Fixed to currency",
    balancePercent = "Balance percentage"
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
    available_balance_percent?: number;
};
