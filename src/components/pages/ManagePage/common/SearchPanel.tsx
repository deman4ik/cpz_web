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
}

const SearchPanel: React.FC<SearchPanelInterface> = ({ callback, setOpenModal }) => {
    const [value, setValue] = useState("");

    const onChangeValue = (val) => {
        setValue(val);
        debounce(() => callback(val), 500);
    };

    return (
        <div className={styles.container_search}>
            <SearchInput placeholder="Search users..." value={value} onChange={onChangeValue} />
            <CaptionButton title="filter" icon="filtervariant" responsive onClick={setOpenModal} />
        </div>
    );
};

export default SearchPanel;
