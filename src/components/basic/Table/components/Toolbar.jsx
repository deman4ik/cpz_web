/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from "react";

import { Button } from "../../Button";
import { GlobalFilter } from "./Filters";
// styles
import styles from "../styles/Common.module.css";
import toolbarStyles from "../styles/Toolbar.module.css";

const Toolbar = ({ itemsCount, onChangeSearch, toggleModal }) => (
    <table className={`${styles.table} ${toolbarStyles.toolbar}`}>
        <thead>
            <tr className={`${styles.table_row} ${styles.flex_start}`}>
                <td>
                    <GlobalFilter itemsCount={itemsCount} onChangeSearch={onChangeSearch} />
                </td>
                <td>
                    <Button title="Configure" icon="settings" onClick={toggleModal} />
                </td>
            </tr>
        </thead>
    </table>
);

export default Toolbar;
