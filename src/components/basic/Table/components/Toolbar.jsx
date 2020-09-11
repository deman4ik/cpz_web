/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from "react";

import { Button } from "../../Button";
import { GlobalFilter } from "./Filters";

// styles
import styles from "../styles/Toolbar.module.css";

const Toolbar = ({ itemsCount, onChangeSearch, toggleModal }) => (
    <div className={styles.toolbar}>
        <GlobalFilter itemsCount={itemsCount} onChangeSearch={onChangeSearch} />
        <Button title="Configure" icon="settings" onClick={toggleModal} />
    </div>
);

export default Toolbar;
