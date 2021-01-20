import React, { FC } from "react";
import styles from "components/ui/Modals/index.module.css";
import styles_subs from "components/ui/Modals/SubscribeModal.module.css";
import { InputTypes } from "components/ui/Modals/types";
import { AssetTypes, getPercent, trimNumber } from "components/ui/Modals/helpers";

interface MinimumAmountProps {
    minAmount: number;
    balance: number;
    asset: string;
    volumeType: InputTypes;
    minAmountUSD: number;
}
const textStyle = { color: "white" };

export const MinimumAmount: FC<MinimumAmountProps> = ({ minAmount, asset, minAmountUSD, volumeType, balance }) => {
    const isCurrentVolumeTypeAssetType = AssetTypes.includes(volumeType);
    const minUSD = trimNumber(minAmountUSD || 0);
    const min = trimNumber(minAmount || 0);

    const percentValue = getPercent(minAmountUSD, balance);
    const minPercentValue =
        volumeType === InputTypes.balancePercent ? (
            <>
                <span>{`${percentValue || 0} %`}</span>
                &nbsp;≈&nbsp;
            </>
        ) : null;
    const currencyValue = (
        <>
            <span>{minUSD || 0}</span>
            &nbsp;<span style={textStyle}>$</span>
        </>
    );
    const assetValue = (
        <>
            <span>{min || 0}</span>&nbsp;
            <span style={textStyle}>{asset}</span>
        </>
    );
    const primaryValue = isCurrentVolumeTypeAssetType ? assetValue : currencyValue;
    const secondaryValue = isCurrentVolumeTypeAssetType ? currencyValue : assetValue;
    return (
        <div className={[styles.bodyText, styles_subs.formComment].join(" ")}>
            <div className={styles.value_group}>
                <div className={styles_subs.label}>Minimal value is&nbsp;</div>
                <div className={styles.value_row}>
                    {minPercentValue}
                    {primaryValue}&nbsp;≈&nbsp;{secondaryValue}
                </div>
            </div>
        </div>
    );
};
