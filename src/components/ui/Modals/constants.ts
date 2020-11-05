import { InputTypes } from "components/ui/Modals/types";

export const SignalInputs = [{ type: InputTypes.assetStatic }, { type: InputTypes.currencyDynamic }];

export const RobotInputs = [
    ...SignalInputs,
    { type: InputTypes.assetDynamicDelta },
    { type: InputTypes.balancePercent }
];
