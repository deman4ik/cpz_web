import React from "react";

import { Button } from "components/basic";
import { displayData } from "./helpers";
import styles from "./RobotsButtonItemCard.module.css";

interface Props {
    isSubscribed: boolean;
    robotStatus: string;
    subscribeToggle: () => void;
    handleOnPressChangeVolume: () => void;
    handleOnPressDelete: () => void;
    displayType: string;
}

export const RobotsButtonItemCard: React.FC<Props> = ({
    isSubscribed,
    subscribeToggle,
    handleOnPressChangeVolume,
    handleOnPressDelete,
    displayType,
    robotStatus
}) => {
    const { title, icon, type } = displayData[displayType];
    const isTypeSignals = displayType === "signals";
    const isTypeRobots = displayType === "robots";
    const checker = isTypeSignals ? isSubscribed : robotStatus;
    const canDisplayEdit = (isTypeSignals && isSubscribed) || isTypeRobots;
    const statusStarted = robotStatus === "started";
    const canDisplayDelete = isTypeRobots && robotStatus === "stopped";
    const statusPaused = robotStatus === "paused";

    return (
        <div className={styles.btnRow}>
            {canDisplayDelete && <Button icon="close" size="small" width={26} onClick={handleOnPressDelete} />}
            {canDisplayEdit && <Button icon="settings" size="small" width={26} onClick={handleOnPressChangeVolume} />}
            <Button
                icon={icon(checker)}
                title={title(checker)}
                type={type(checker)}
                className={!statusStarted && "primary"}
                isUppercase
                disabled={isTypeRobots && robotStatus === "stopping"}
                size="small"
                onClick={subscribeToggle}
                blocked={isTypeRobots && statusPaused}
            />
        </div>
    );
};
