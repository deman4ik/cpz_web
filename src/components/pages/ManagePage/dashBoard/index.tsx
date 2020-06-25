import React from "react";
// hooks
import useWindowDimensions from "hooks/useWindowDimensions";
// components
import { Template } from "components/layout/Template";
import UserStats from "./components/UserStats";
// styles
import styles from "./styles/Dasboard.module.css";
// constants
import { PageType } from "config/types";

const MangeDashboard: React.FC<any> = () => {
    const { width } = useWindowDimensions();
    return (
        <Template title="Dashboard" subTitle="Users dashboard" width={width} page={PageType.dasHboard}>
            <div className={styles.cards_wrapper}>
                <UserStats />
            </div>
        </Template>
    );
};

export default MangeDashboard;
