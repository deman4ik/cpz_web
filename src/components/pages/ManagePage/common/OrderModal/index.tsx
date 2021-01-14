import React, { useState } from "react";
// utils
import deepClone from "utils/deepClone";
// components
import { Button, Select, Modal } from "components/basic";
// types
import { OrderInterface, SortType, SortMethodType } from "./types";
// modal styles
import styles from "components/ui/Modals/SearchFiltersModal/index.module.css";

export interface OrderModalProps {
    orderState: OrderInterface;
    setOrderState: any;
    closeModal: () => void;
    clearOrder: () => void;
    sortSettings: {
        sort_methods: SortMethodType;
        sort_types: Array<SortType>;
        default_sort_name: string;
    };
    isOpen: boolean;
    title: string;
}

const OrderModal: React.FC<OrderModalProps> = ({
    orderState: { sort, filters },
    setOrderState,
    closeModal,
    sortSettings: { sort_methods, sort_types, default_sort_name },
    clearOrder,
    isOpen,
    title
}) => {
    const [sortState, setSortState] = useState(sort.name || default_sort_name);
    const [filtersState, setLocalFilters] = useState(filters);

    /*confirm filters and sort*/
    const confirmOrder = (): void => {
        const newOrder = {
            sort: {
                name: sortState,
                order_by: sort_methods[sortState]
            },
            filters: filtersState
        };
        setOrderState(newOrder);
        closeModal();
    };

    const changeLocalFilter = ({ parent, itemName }) => {
        /*clone data*/
        const newFilters = deepClone(filtersState);
        /*change active state*/
        const filterItem = newFilters[parent].filters.find(({ name }) => itemName === name);
        filterItem.active = !filterItem.active;
        setLocalFilters(newFilters);
    };

    return (
        <Modal
            title={title}
            isOpen={isOpen}
            onClose={closeModal}
            footer={
                <>
                    <Button title="OK" icon="check" type="success" onClick={confirmOrder} isUppercase />
                    <Button
                        type="dimmed"
                        width={160}
                        title="clear filter"
                        className={styles.btn}
                        onClick={clearOrder}
                        icon="filtervariantremove"
                        isUppercase
                    />
                </>
            }>
            <div className={styles.row}>
                <div className={styles.label}>
                    <div className={styles.labelText}>Sort by:</div>
                </div>
                <div className={styles.orderby}>
                    <Select data={sort_types} value={sortState} onChangeValue={(value) => setSortState(value)} />
                </div>
            </div>
            {filtersState &&
                Object.keys(filtersState).map((key) => (
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
                                    onClick={() => {
                                        changeLocalFilter({ parent: key, itemName: name });
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                ))}
        </Modal>
    );
};

export default OrderModal;
