import React from "react";

import { Button } from "components/basic";
import { displayData } from "./helpers";
import styles from "./RobotsItem.module.css";

interface Props {
    isSubscribed: boolean;
    robotStatus: string;
    subscribeToggle: () => void;
    handleOnPressChangeVolume: () => void;
    handleOnPressDelete: () => void;
    displayType: string;
}

export const RobotsButtonItem: React.FC<Props> = ({
    isSubscribed,
    subscribeToggle,
    handleOnPressChangeVolume,
    handleOnPressDelete,
    displayType,
    robotStatus
}) => {
    const { title, icon, type, hoverTitle, hoverIcon, hoverType } = displayData[displayType];
    const isRobotType = displayType === "robots";
    const isSignalType = displayType === "signals";

    const checker = isSignalType ? isSubscribed : robotStatus;
    const statusStarted = robotStatus === "started";
    const statusStopped = robotStatus === "stopped";
    const statusPaused = robotStatus === "paused";

    const typeSignalAndSubscribed = isSignalType && isSubscribed;
    const typeRobotAndStopped = isRobotType && statusStopped;

    const canDisplayHover = () => (isRobotType && statusStarted) || typeSignalAndSubscribed;
    const canDisplayEdit = () => typeSignalAndSubscribed || (isRobotType && robotStatus);
    const canDisplayDelete = () => typeRobotAndStopped;

    console.log(subscribeToggle);

    return (
        <div className={styles.cellAction}>
            <Button
                icon={icon(checker)}
                title={title(checker)}
                type={type(checker)}
                isUppercase
                width={120}
                size="small"
                className={statusStarted ? "success" : "primary"}
                blocked={isRobotType && statusPaused}
                disabled={isRobotType && robotStatus === "stopping"}
                hoverChanges={
                    canDisplayHover()
                        ? {
                              type: hoverType(robotStatus),
                              title: hoverTitle(robotStatus),
                              icon: hoverIcon(robotStatus)
                          }
                        : null
                }
                onClick={subscribeToggle}
            />
            {canDisplayEdit() && (
                <Button
                    title="edit"
                    icon="settings"
                    size="small"
                    type="dimmed"
                    isUppercase
                    width={120}
                    style={{ marginTop: 6 }}
                    onClick={handleOnPressChangeVolume}
                />
            )}
            {canDisplayDelete() && (
                <Button
                    title="delete"
                    icon="close"
                    size="small"
                    type="dimmed"
                    isUppercase
                    width={120}
                    style={{ marginTop: 6 }}
                    onClick={handleOnPressDelete}
                />
            )}
        </div>
    );
};
