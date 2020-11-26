import React, { FC } from "react";
import { InputTypes } from "components/ui/Modals/types";
import styles from "components/ui/Modals/index.module.css";
import styles_subs from "components/ui/Modals/SubscribeModal.module.css";

interface PercentsAvailableProps {
    usedAccountPercent: number;
    short?: boolean;
    volumeType: InputTypes;
}
const message = "Available balance percentage";
const shortMessage = "Available";
export const PercentsAvailable: FC<PercentsAvailableProps> = ({ usedAccountPercent, volumeType, short }) => {
    const maxPercentageValue = 100 - usedAccountPercent;
    return volumeType === InputTypes.balancePercent ? (
        <div className={[styles.bodyText, styles_subs.formComment].join(" ")} style={{ marginBottom: short ? 0 : 10 }}>
            <div className={styles.value_group}>
                {short ? (
                    <div
                        className={styles_subs.label}
                        style={{ paddingRight: 10 }}>{`${shortMessage} ${maxPercentageValue}%`}</div>
                ) : (
                    <>
                        <div className={styles_subs.label}>{message}</div>
                        <div style={{ textAlign: "center" }}>{maxPercentageValue}%</div>
                    </>
                )}
            </div>
        </div>
    ) : null;
};
