import React, { useState } from "react";
// utils
import debounce from "utils/debounce";
// components
import { SearchInput, CaptionButton } from "components/basic";
// styles
import styles from "./Common.module.css";

interface SearchPanelInterface {
    callback: (value: string) => any; // callback функция которая  обрабатывает значения
    setOpenModal?: () => void; // Модалка с фильтрами
    placeholder?: string;
    orderTitle?: string;
    clear: () => void;
}

const SearchPanel: React.FC<SearchPanelInterface> = ({
    callback,
    setOpenModal,
    placeholder,
    clear,
    orderTitle = "filter"
}) => {
    const [value, setValue] = useState("");

    const onChangeValue = (val) => {
        setValue(val);
        debounce(() => callback(val), 500);
    };

    return (
        <div className={styles.container}>
            <SearchInput placeholder={placeholder || "Search..."} value={value} onChange={onChangeValue} />
            {setOpenModal && (
                <CaptionButton title={orderTitle} icon="filtervariant" responsive onClick={setOpenModal} />
            )}
            <CaptionButton
                title="clear"
                icon="filtervariantremove"
                responsive
                onClick={() => {
                    setValue("");
                    clear();
                }}
            />
        </div>
    );
};

export default SearchPanel;
