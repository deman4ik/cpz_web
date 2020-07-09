import React, { useState, memo } from "react";
// constants
import { INITIAL_FILTERS, InitialFiltersInterface } from "../constants";
// components
import { Button, Select } from "components/basic";
// filters styles
import styles from "components/ui/Modals/SearchFiltersModal/index.module.css";

// sort variants
const orderSortList = [
    { value: "user_robots_up", label: "User robots ↑" },
    { value: "user_robots_down", label: "User robots ↓" },
    { value: "user_signals_up", label: "User signals ↑" },
    { value: "user_signals_down", label: "User signals ↓" },
    { value: "user_ex_acc_up", label: "User keys ↑" },
    { value: "user_ex_acc_down", label: "User keys ↓" },
    { value: "created_at_up", label: "User date ↑" },
    { value: "created_at_down", label: "User date ↓" }
];

const orderSortMethod = {
    user_robots_up: { user_robots_aggregate: { count: "asc" } },
    user_robots_down: { user_robots_aggregate: { count: "desc" } },
    user_signals_up: { user_signals_aggregate: { count: "asc" } },
    user_signals_down: { user_signals_aggregate: { count: "desc" } },
    user_ex_acc_up: { user_exchange_accs_aggregate: { count: "asc" } },
    user_ex_acc_down: { user_exchange_accs_aggregate: { count: "desc" } },
    created_at_up: { created_at: { count: "asc" } },
    created_down: { created_at: { count: "desc" } }
};

// types
export interface UserFiltersState {
    filtersState: InitialFiltersInterface;
    setFiltersState: any;
    closeModal: () => void;
}

const UserFilters: React.FC<UserFiltersState> = ({ filtersState: { order, filters }, setFiltersState, closeModal }) => {
    const [sortState, setSortState] = useState(order.name || "user_robots_up");

    /*confirm filters and sort*/
    const confirmFilters = (): void => {
        const newFilters: InitialFiltersInterface = {
            filters,
            order: {
                name: sortState,
                order_by: orderSortMethod[sortState]
            }
        };
        setFiltersState(newFilters);
        closeModal();
    };

    /*clear filters and set default state*/
    const clearFilters = (): void => {
        setFiltersState(INITIAL_FILTERS);
        closeModal();
    };

    return (
        <>
            <div className={styles.row}>
                <div className={styles.label}>
                    <div className={styles.labelText}>Sort by:</div>
                </div>
                <div className={styles.orderby}>
                    <Select data={orderSortList} value={sortState} onValueChange={(value) => setSortState(value)} />
                </div>
            </div>
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

export default memo(UserFilters);
