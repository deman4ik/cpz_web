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
    const [isVisibleFilters, setIsVisibleFilters] = useState(false);
    const { width } = useWindowDimensions();

    const handlePressBack = () => {
        Router.back();
    };

    const setVisibleToolbarFilters = () => {
        setIsVisibleFilters((prev) => !prev);
    };

    return (
        <DefaultTemplate
            page={PageType.robots}
            title="Robots Search"
            width={width}
            toolbar={<SearchToolbar setVisibleToolbarFilters={setVisibleToolbarFilters} displayType="robots" />}
            handlePressBack={handlePressBack}>
            <div className={styles.container}>
                <RobotsSearchContainer displayType="robots" width={width} />
            </div>
            <Modal isOpen={isVisibleFilters} title="Filter Robots Search" onClose={setVisibleToolbarFilters}>
                <SearchFiltersModal onClose={setVisibleToolbarFilters} displayType="robots" />
            </Modal>
        </DefaultTemplate>
    );
};
