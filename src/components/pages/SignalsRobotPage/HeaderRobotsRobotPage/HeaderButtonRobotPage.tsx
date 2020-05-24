import React from "react";

import { Button } from "../../../basic";
import { createVariable } from "../helpers";
import styles from "./HeaderButtonRobotPage.module.css";

interface Props {
    robotSubscribe: (variables: any) => void;
    robotData: any;
}

export const HeaderButtonRobotPage: React.FC<Props> = ({ robotSubscribe, robotData }) => {
    const { isUserSignals } = robotData.robot;
    const handleOnPress = () => {
        robotSubscribe(createVariable(robotData, isUserSignals ? "unsubscribe" : "subscribe"));
    };

    return isUserSignals ? (
        <Button
            title="Following"
            type="success"
            size="small"
            icon="check"
            width={112}
            className={styles.headerButton}
            hoverChanges={{
                type: "negative",
                title: "Unfollow",
                icon: "minus"
            }}
            isUppercase
            onClick={handleOnPress}
        />
    ) : null;
};
