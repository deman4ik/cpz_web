import { InputTypes } from "components/ui/Modals/types";

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
    asset: any;
    available_balance_percent?: number;
    precision: any;
    price: number;
    total_balance_usd: number;
    used_balance_percent: number;
};
