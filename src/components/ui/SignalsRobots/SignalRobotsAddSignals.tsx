import React from "react";
import Router from "next/router";

import { CaptionButton } from "../../basic";
import styles from "./SignalRobotsAddSignals.module.css";

interface Props {
    displayType: string;
}

export const SignalRobotsAddSignals: React.FC<Props> = ({ displayType }) => {
    const handleOnClick = () => {
        Router.push(`/${displayType}/search`);
    };

    return (
        <div className={styles.itemContainer}>
            <div className={styles.border} onClick={handleOnClick}>
                <CaptionButton title={`Add ${displayType}`} icon="plus" />
            </div>
        </div>
    );
};
