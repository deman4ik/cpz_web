import React, { useEffect, useState } from "react";
import Router from "next/router";

import useWindowDimensions from "hooks/useWindowDimensions";
import { DefaultTemplate } from "components/layout";
import { SignalsSearchContainer } from "./SignalsSearchContainer";
import { Modal } from "components/basic";
import { SearchToolbar } from "components/ui/RobotsList/SearchToolbar";
import { PageType } from "config/types";
import { SearchFiltersModal } from "components/ui/Modals";
import styles from "./index.module.css";
import { isNewPage } from "utils/common";

export const SignalRobotsSearchPage: React.FC = () => {
    const [isFiltersModalVisible, setFiltersModalVisibility] = useState(false);
    const { width } = useWindowDimensions();
    const [pageIsNew, setPageIsNew] = React.useState(true);

    useEffect(() => {
        setPageIsNew(isNewPage());
    }, []);

    const handlePressBack = () => {
        Router.back();
    };

    const toggleFiltersVisibility = () => {
        setFiltersModalVisibility((prev) => !prev);
    };

    return (
        <DefaultTemplate
            page={PageType.signals}
            title="Signals Search"
            width={width}
            toolbar={<SearchToolbar toggleFiltersVisibility={toggleFiltersVisibility} displayType="signals" />}
            handlePressBack={pageIsNew ? handlePressBack : null}>
            <div className={styles.container}>
                <SignalsSearchContainer displayType="signals" width={width} />
            </div>
            <Modal isOpen={isFiltersModalVisible} onClose={toggleFiltersVisibility} title="Filter Signals Search">
                <SearchFiltersModal onClose={toggleFiltersVisibility} displayType="signals" />
            </Modal>
        </DefaultTemplate>
    );
};
