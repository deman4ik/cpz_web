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
            ? "To start manual trading - subscribe to signals"
            : "To start automated trading - add robots";
    return (
        <>
            <div className={styles.labelContainer}>{label}</div>
            <AddRobotsCard displayType={type} />
        </>
    );
};
