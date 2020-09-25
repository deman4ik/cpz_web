import React, { memo } from "react";

import { TabType } from "config/types";
import { TabButton } from "components/basic";
import { tabNames } from "../helpers";
import styles from "./styles/Tabs.module.css";

interface Props {
    activeTab: TabType;
    setActiveTab: (activeTab: TabType) => void;
    isOwnedByUser: boolean;
}

const _HeaderTabs: React.FC<Props> = ({ activeTab, setActiveTab, isOwnedByUser }) => (
    <div className={styles.tabsHeader}>
        <div className={`${styles.tabsBtns}`}>
            {Object.keys(tabNames).map((key) =>
                (isOwnedByUser && key === "myStatistic") || key !== "myStatistic" ? (
                    <TabButton
                        key={key}
                        title={tabNames[key]}
                        isActive={TabType[key] === activeTab}
                        handleOnClick={() => setActiveTab(TabType[key])}
                        style={{ margin: "0 5px" }}
                    />
                ) : null
            )}
        </div>
    </div>
);

export const HeaderTabs = memo(_HeaderTabs);
