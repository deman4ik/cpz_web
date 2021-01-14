import React from "react";
import Router from "next/router";

import { CaptionButton } from "../../basic";
import styles from "./AddRobotsCard.module.css";

interface Props {
    displayType: string;
    mobile?: boolean;
}

export const AddRobotsCard: React.FC<Props> = ({ displayType, mobile = false }) => {
    const handleOnClick = () => {
        Router.push(`/${displayType}/search`);
    };

    return (
        <div className={mobile ? styles.mobileContainer : styles.container}>
            <div className={styles.border} onClick={handleOnClick}>
                <CaptionButton title={`Add ${displayType}`} icon="plus" responsive={false} />
            </div>
        </div>
    );
};
