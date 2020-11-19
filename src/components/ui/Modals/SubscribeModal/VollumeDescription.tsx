import React, { FC, useMemo } from "react";
import styles_subs from "components/ui/Modals/SubscribeModal.module.css";
import { InputTypes } from "components/ui/Modals/types";

interface VolumeDescriptionProps {
    volumeType: InputTypes;
    asset: string;
    currency: string;
}
export const VolumeDescription: FC<VolumeDescriptionProps> = ({ volumeType, asset, currency }) => {
    const volumeTypeDescriptions = useMemo(
        () => ({
            [InputTypes.balancePercent]: `fixed in percents of user's balance`,
            [InputTypes.assetStatic]: `fixed in ${asset}`,
            [InputTypes.assetDynamicDelta]: `fixed in ${asset}`,
            [InputTypes.currencyDynamic]: `fixed in ${currency}`
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [asset, currency]
    );

    return (
        <div className={`${styles_subs.label} ${styles_subs.description}`}>
            <span>All positions trading amount will be</span>
            <span>{volumeTypeDescriptions[volumeType]}</span>
        </div>
    );
};
