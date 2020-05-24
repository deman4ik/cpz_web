import React, { memo } from "react";

import { Button } from "../../basic";
import { exchangeName, capitalize } from "../../../config/utils";
import styles from "./StatsPageFilters.module.css";

interface Props {
    filterItem: {
        items: string[];
        label: string;
    };
    labelsCombination: string[];
    label: string;
    checkedItem: string;
    checkFilterButton: (label: string, item: string) => void;
    availableFilters: string[];
}

const _StatsPageFilters: React.FC<Props> = ({
    filterItem,
    checkFilterButton,
    label,
    labelsCombination,
    checkedItem,
    availableFilters
}) => {
    const handleOnPressItem = (item: string) => {
        checkFilterButton(filterItem.label, item);
    };

    return (
        <div className={styles.container}>
            <div className={styles.label}>
                <div className={styles.labelText}>{`${capitalize(label)}:`}</div>
            </div>
            <div className={styles.btnContainer}>
                {labelsCombination.map((item: string) => {
                    const availableButton = availableFilters.includes(item);
                    return (
                        <Button
                            key={item}
                            disabled={!availableButton}
                            type={
                                checkedItem === item
                                    ? "rounded-primary"
                                    : !availableButton
                                    ? "rounded-negative"
                                    : "rounded"
                            }
                            title={exchangeName(item)}
                            clickable={false}
                            onClick={() => handleOnPressItem(item)}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export const StatsPageFilters = memo(_StatsPageFilters);
