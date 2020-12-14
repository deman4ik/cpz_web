import React from "react";
import { AddRobotsCard } from "components/ui/SignalsRobots/AddRobotsCard";
import { RobotsType } from "config/types";
import styles from "./index.module.css";

type Props = {
    type: string;
};

export const AddRobotsCardWithHeader = ({ type }: Props): JSX.Element => {
    const label =
        type === RobotsType.signals
            ? "Choose robot for manual trading on Signals Page"
            : "Add chosen Robot, enter your trading amount and link it with your API Keys";
    return (
        <>
            <div className={styles.labelContainer}>{label}</div>
            <AddRobotsCard displayType={type} />
        </>
    );
};
