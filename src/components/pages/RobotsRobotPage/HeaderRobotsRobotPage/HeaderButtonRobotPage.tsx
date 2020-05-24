import React, { memo } from "react";

import { displayData, statusTypes } from "../../../ui/RobotsItems/helpers";
import { Button } from "../../../basic";
import { createVariable } from "../helpers";
import styles from "./HeaderButtonRobotPage.module.css";

interface Props {
    robotData: any;
    robotSubscribe: (variables: any) => void;
}

const _HeaderButtonRobotPage: React.FC<Props> = ({ robotData, robotSubscribe }) => {
    const robotStatus = robotData.user_robots ? robotData.user_robots.status : null;
    const { title, icon, type, hoverTitle, hoverType, hoverIcon } = displayData.robots;
    const handleOnPress = () => {
        robotSubscribe(createVariable(robotData, statusTypes[robotStatus]));
    };

    return (
        <>
            {robotStatus ? (
                <Button
                    icon={icon(robotStatus)}
                    title={title(robotStatus)}
                    type={type(robotStatus)}
                    className={styles.headerButton}
                    disabled={robotStatus === "stopping"}
                    size="small"
                    width={112}
                    hoverChanges={
                        robotStatus === "started" || robotStatus === "paused"
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

export const HeaderButtonRobotPage = memo(_HeaderButtonRobotPage);
