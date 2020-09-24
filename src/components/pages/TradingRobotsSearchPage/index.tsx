import React, { useState } from "react";
import Router from "next/router";

// hooks
import useWindowDimensions from "hooks/useWindowDimensions";
// components
import { DefaultTemplate } from "components/layout";
import { RobotsSearchContainer } from "./RobotsSearchContainer";
import { SearchToolbar } from "components/ui/RobotsList/SearchToolbar";
import { Modal } from "components/basic";
import { PageType } from "config/types";
import { SearchFiltersModal } from "components/ui/Modals";
// styles
import styles from "./index.module.css";

export const RobotsSearchPage: React.FC = () => {
    const [isFiltersModalVisible, setFiltersModalVisibility] = useState(false);
    const { width } = useWindowDimensions();

    const handlePressBack = () => {
        Router.back();
    };

    const toggleFiltersVisibility = () => {
        setFiltersModalVisibility((prev) => !prev);
    };

    return (
        <DefaultTemplate
            page={PageType.robots}
            title="Robots Search"
            width={width}
            toolbar={<SearchToolbar toggleFiltersVisibility={toggleFiltersVisibility} displayType="robots" />}
            hideToolbar
            handlePressBack={handlePressBack}>
            <div className={styles.container}>
                <RobotsSearchContainer displayType="robots" width={width} />
            </div>
            <Modal isOpen={isFiltersModalVisible} title="Filter Robots Search" onClose={toggleFiltersVisibility}>
                <SearchFiltersModal onClose={toggleFiltersVisibility} displayType="robots" />
            </Modal>
        </DefaultTemplate>
    );
};
