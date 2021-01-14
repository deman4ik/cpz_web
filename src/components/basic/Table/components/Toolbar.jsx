/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from "react";

import { CaptionButton } from "components/basic";
import { GlobalFilter } from "./Filters";

// styles
import styles from "../styles/Toolbar.module.css";

const Toolbar = ({
    itemsCount,
    onChangeSearch,
    toggleControlModal,
    toggleActionModal,
    actionModalCanBeOpened = false
}) => (
    <div className={styles.toolbar}>
        <GlobalFilter itemsCount={itemsCount} onChangeSearch={onChangeSearch} />
        <CaptionButton title="Edit" icon="edit" onClick={toggleActionModal} hidden={!actionModalCanBeOpened} />
        <CaptionButton title="Configure" icon="settings" onClick={toggleControlModal} />
    </div>
);

export default Toolbar;
