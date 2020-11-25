import React, { FC } from "react";
import { InputTypes } from "components/ui/Modals/types";
import styles from "components/ui/Modals/index.module.css";
import styles_subs from "components/ui/Modals/SubscribeModal.module.css";

interface PercentsAvailableProps {
    usedAccountPercent: number;
    volumeType: InputTypes;
}
export const PercentsAvailable: FC<PercentsAvailableProps> = ({ usedAccountPercent, volumeType }) => {
    const maxPercentageValue = 100 - usedAccountPercent;
    return volumeType === InputTypes.balancePercent ? (
        <div className={[styles.bodyText, styles_subs.formComment].join(" ")}>
            <div className={styles.value_group}>
                <div className={styles_subs.label}>Available balance percentage</div>
                <div style={{ textAlign: "center" }}>{maxPercentageValue}%</div>
            </div>
        </div>
    ) : null;
};
