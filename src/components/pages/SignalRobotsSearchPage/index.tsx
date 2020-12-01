import React, { useState } from "react";

import useWindowDimensions from "hooks/useWindowDimensions";
import { DefaultTemplate } from "components/layout";
import { SignalsSearchContainer } from "./SignalsSearchContainer";
import { Modal } from "components/basic";
import { SearchToolbar } from "components/ui/RobotsList/SearchToolbar";
import { PageType } from "config/types";
import { SearchFiltersModal } from "components/ui/Modals";
import styles from "./index.module.css";

export const SignalRobotsSearchPage: React.FC = () => {
    const [isFiltersModalVisible, setFiltersModalVisibility] = useState(false);
    const { width } = useWindowDimensions();

    const toggleFiltersVisibility = () => {
        setFiltersModalVisibility((prev) => !prev);
    };

    return (
        <DefaultTemplate
            page={PageType.signals}
            title="Signals Search"
            toolbar={<SearchToolbar toggleFiltersVisibility={toggleFiltersVisibility} displayType="signals" />}
            handleBackNavigation>
            <div className={styles.container}>
                <SignalsSearchContainer displayType="signals" width={width} />
            </div>
            <Modal isOpen={isFiltersModalVisible} onClose={toggleFiltersVisibility} title="Filter Signals Search">
                <SearchFiltersModal onClose={toggleFiltersVisibility} displayType="signals" />
            </Modal>
        </DefaultTemplate>
    );
};
