import React from "react";

import { Button } from "components//basic";
import { createVariable } from "../helpers";
import styles from "./styles/HeaderButton.module.css";

interface Props {
    subscribe: (variables: any) => void;
    robotData: any;
}

export const HeaderButton: React.FC<Props> = ({ subscribe, robotData }) => {
    const { isUserSubscribed } = robotData.robot;
    const handleOnPress = () => {
        subscribe(createVariable(robotData, isUserSubscribed ? "unsubscribe" : "subscribe"));
    };

    return isUserSubscribed ? (
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
