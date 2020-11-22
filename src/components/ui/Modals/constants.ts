import { InputTypes } from "components/ui/Modals/types";
import { RobotsType } from "config/types";

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

export const robotVolumeTypeOptions = [
    ...volumeTypeOptions,
    {
        label: "Dynamic asset",
        value: InputTypes.assetDynamicDelta
    },
    {
        label: "Balance percentage",
        value: InputTypes.balancePercent
    }
];

export const volumeTypeOptionsMap = {
    [RobotsType.robots]: robotVolumeTypeOptions,
    [RobotsType.signals]: volumeTypeOptions
};
export const AssetStaticInputs = [{ type: InputTypes.assetStatic }, { type: InputTypes.currencyDynamic }];
export const CurrencyDynamicInputs = [{ type: InputTypes.currencyDynamic }, { type: InputTypes.assetStatic }];
export const AssetDynamicDeltaInputs = [{ type: InputTypes.assetDynamicDelta }, { type: InputTypes.currencyDynamic }];
export const BalancePercentInputs = [
    { type: InputTypes.balancePercent },
    { type: InputTypes.currencyDynamic },
    { type: InputTypes.assetStatic }
];

export const AddRobotInputsMap = {
    // depending on type of trading volume, set of inputs will be chosen
    [InputTypes.assetStatic]: AssetStaticInputs,
    [InputTypes.currencyDynamic]: CurrencyDynamicInputs,
    [InputTypes.assetDynamicDelta]: AssetDynamicDeltaInputs,
    [InputTypes.balancePercent]: BalancePercentInputs
};
