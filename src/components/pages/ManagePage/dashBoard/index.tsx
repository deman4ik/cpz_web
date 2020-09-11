import React from "react";
// hooks
import useWindowDimensions from "hooks/useWindowDimensions";
// components
import { ManagementTemplate } from "components/layout";
import UserStats from "./components/UserStats";
// styles
import styles from "./styles/Dasboard.module.css";
// constants
import { PageType } from "config/types";

const MangeDashboard: React.FC<any> = () => {
    const { width } = useWindowDimensions();
    return (
        <ManagementTemplate title="Dashboard" subTitle="Users dashboard" page={PageType.dashboard}>
            <div className={styles.cards_wrapper}>
                <UserStats />
            </div>
        </ManagementTemplate>
    );
};

export default MangeDashboard;
