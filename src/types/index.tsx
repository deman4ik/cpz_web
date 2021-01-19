import { InputTypes } from "components/ui/Modals/types";
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
