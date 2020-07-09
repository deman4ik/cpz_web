import React, { useState, memo } from "react";
// constants
import { INITIAL_FILTERS, InitialFiltersInterface } from "../../constants";
import { ORDER_SORT_LIST, ORDER_SORT_METHOD } from "./constants";
// utils
import deepClone from "utils/deepClone";
// components
import { Button, Select } from "components/basic";
// filters styles
import styles from "components/ui/Modals/SearchFiltersModal/index.module.css";

// types
export interface UserFiltersState {
    filtersState: InitialFiltersInterface;
    setFiltersState: any;
    closeModal: () => void;
}

const UserFilters: React.FC<UserFiltersState> = ({ filtersState: { order, filters }, setFiltersState, closeModal }) => {
    const [sortState, setSortState] = useState(order.name || "user_robots_up");
    const [filtersState, setLocalFilters] = useState(filters);

    /*confirm filters and sort*/
    const confirmFilters = (): void => {
        const newFilters: InitialFiltersInterface = {
            filters: filtersState,
            order: {
                name: sortState,
                order_by: ORDER_SORT_METHOD[sortState]
            }
        };
        setFiltersState(newFilters);
        closeModal();
    };

    /*clear filters and set default state*/
    const clearFilters = (): void => {
        console.log(INITIAL_FILTERS);
        setFiltersState({ ...INITIAL_FILTERS });
        closeModal();
    };

    /*set local filters*/
    const changeLocalFilter = ({ parent, itemName }) => {
        /*clone data*/
        const newFilters = deepClone(filtersState);
        /*change active state*/
        const filterItem = newFilters[parent].filters.find(({ name }) => itemName === name);
        filterItem.active = !filterItem.active;

        setLocalFilters(newFilters);
    };

    return (
        <>
            <div className={styles.row}>
                <div className={styles.label}>
                    <div className={styles.labelText}>Sort by:</div>
                </div>
                <div className={styles.orderby}>
                    <Select data={ORDER_SORT_LIST} value={sortState} onValueChange={(value) => setSortState(value)} />
                </div>
            </div>
            {Object.keys(filtersState).map((key) => (
                <div key={key} className={styles.row}>
                    <div className={styles.label}>
                        <div className={styles.labelText}>{filtersState[key].label}</div>
                    </div>
                    <div className={styles.btnContainer}>
                        {filtersState[key].filters.map(({ name, active }) => (
                            <Button
                                key={name}
                                type={active ? "rounded-primary" : "rounded"}
                                title={name}
                                style={{ marginLeft: 5, marginTop: 5 }}
                                clickable={false}
                                onClick={() =>
                                    changeLocalFilter({
                                        parent: key,
                                        itemName: name
                                    })
                                }
                            />
                        ))}
                    </div>
                </div>
            ))}
            <div className={styles.btnsGroup}>
                <Button title="OK" icon="check" type="success" onClick={confirmFilters} isUppercase />
                <Button
                    type="dimmed"
                    width={160}
                    title="clear filter"
                    className={styles.btn}
                    onClick={clearFilters}
                    icon="filtervariantremove"
                    isUppercase
                />
            </div>
        </>
    );
};

export default UserFilters;
