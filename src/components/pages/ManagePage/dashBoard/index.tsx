import React from "react";
// hooks
// components
import { ManagementTemplate } from "components/layout";
import UserStats from "./components/UserStats";
// styles
import styles from "./styles/Dasboard.module.css";
// constants
import { PageType } from "config/types";
import { RobotsTotalPerformance } from "./components/RobotsTotalPerformance";
import { ROBOTS_TOTAL_PERFORMANCE, USER_ROBOTS_TOTAL_PERFORMANCE } from "graphql/signals/queries";

const MangeDashboard: React.FC<any> = () => {
    return (
        <ManagementTemplate title="Dashboard" subTitle="Users dashboard" page={PageType.dashboard} withToolbar={false}>
            <div className={styles.cards_wrapper}>
                <RobotsTotalPerformance
                    title="Robots Total Performance"
                    query={ROBOTS_TOTAL_PERFORMANCE}
                    type="robots"
                />
                <RobotsTotalPerformance
                    title="User Robots Total Performance"
                    query={USER_ROBOTS_TOTAL_PERFORMANCE}
                    type="user_robots"
                />
                <UserStats />
            </div>
        </ManagementTemplate>
    );
};

export default MangeDashboard;
