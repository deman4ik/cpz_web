/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from "react";

import { Button } from "../../Button";
import { GlobalFilter } from "./TableFilters";
// styles
import styles from "../styles/Common.module.css";

const Toolbar = ({ itemsCount, onChangeSearch, toggleModal }) => (
    <table className={styles.table}>
        <thead>
            <tr className={`${styles.table_row} ${styles.flex_spread}`}>
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
