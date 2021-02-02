import React, { memo } from "react";
import { displayData, statusTypes } from "components/ui/RobotsItems/helpers";
import { Button } from "components/basic";
import { createVariable } from "../helpers";
import styles from "components/pages/TradingRobotPage/Header/styles/HeaderButton.module.css";

interface Props {
    robotData: any;
    subscribe: (variables: any) => void;
}

const _HeaderButton: React.FC<Props> = ({ robotData, subscribe }) => {
    const robotStatus = robotData.userRobot ? robotData.userRobot.status : null;
    const { title, icon, type, hoverTitle, hoverType, hoverIcon } = displayData.robots;

    const robotPaused = robotStatus === "paused";
    const statusStarted = robotStatus === "started";
    const handleOnPress = () => {
        if (robotPaused) {
            return;
        }
        subscribe(createVariable(robotData, statusTypes[robotStatus]));
    };

    return (
        <>
            {robotStatus ? (
                <Button
                    icon={icon(robotStatus)}
                    title={title(robotStatus)}
                    type={type(robotStatus)}
                    className={statusStarted ? styles.headerButtonSuccess : styles.headerButtonPrimary}
                    blocked={robotPaused}
                    disabled={robotStatus === "stopping"}
                    size="small"
                    width={112}
                    hoverChanges={
                        robotStatus === "started"
                            ? {
                                  type: hoverType(robotStatus),
                                  title: hoverTitle(robotStatus),
                                  icon: hoverIcon(robotStatus)
                              }
                            : null
                    }
                    isUppercase
                    onClick={handleOnPress}
                />
            ) : null}
        </>
    );
};

export const HeaderButton = memo(_HeaderButton);
