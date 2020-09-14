/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from "react";

import { CaptionButton } from "components/basic";
import { GlobalFilter } from "./Filters";

// styles
import styles from "../styles/Toolbar.module.css";

const Toolbar = ({ itemsCount, onChangeSearch, toggleModal }) => (
    <div className={styles.toolbar}>
        <GlobalFilter itemsCount={itemsCount} onChangeSearch={onChangeSearch} />
        <CaptionButton title="Configure" icon="settings" onClick={toggleModal} />
    </div>
);

export default Toolbar;
