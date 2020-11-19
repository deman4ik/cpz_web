import React, { FC } from "react";
import styles from "components/ui/Modals/index.module.css";
import styles_subs from "components/ui/Modals/SubscribeModal.module.css";
import { InputTypes } from "components/ui/Modals/types";
import { AssetTypes, trimNumber } from "components/ui/Modals/helpers";

interface MinimumAmountProps {
    minAmount: number;
    asset: string;
    volumeType: InputTypes;
    minAmountUSD: number;
}
export const MinimumAmount: FC<MinimumAmountProps> = ({ minAmount, asset, minAmountUSD, volumeType }) => {
    const isCurrentVolumeTypeAssetType = AssetTypes.includes(volumeType);
    const minUSD = trimNumber(minAmountUSD || 0);
    const min = trimNumber(minAmount || 0);
    const currencyValue = (
        <>
            <span>{minUSD || 0}</span>
            &nbsp;<span style={{ color: "white" }}>$</span>
        </>
    );
    const assetValue = (
        <>
            <span>{min || 0}</span>&nbsp;
            <span style={{ color: "white" }}>{asset}</span>
        </>
    );
    const primaryValue = isCurrentVolumeTypeAssetType ? assetValue : currencyValue;
    const secondaryValue = isCurrentVolumeTypeAssetType ? currencyValue : assetValue;
    return (
        <div className={[styles.bodyText, styles_subs.formComment].join(" ")}>
            <div className={styles.value_group}>
                <div className={styles_subs.label}>Minimal value is&nbsp;</div>
                <div className={styles.value_row}>
                    {primaryValue}&nbsp;≈&nbsp;{secondaryValue}
                </div>
            </div>
        </div>
    );
};
