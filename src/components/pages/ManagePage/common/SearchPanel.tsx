import React, { useState } from "react";
// utils
import debounce from "utils/debounce";
// components
import { SearchInput } from "components/basic";
// styles
import styles from "./Common.module.css";

interface SearchPanelInterface {
    callback: (value: string) => any; // callback функция которая  обрабатывает значения
}

const SearchPanel: React.FC<SearchPanelInterface> = ({ callback }) => {
    const [value, setValue] = useState("");

    const onChangeValue = (val) => {
        setValue(val);
        debounce(() => callback(val), 500);
    };

    return (
        <div className={styles.container_search}>
            <SearchInput placeholder="search here" value={value} onChange={onChangeValue} />
        </div>
    );
};

export default SearchPanel;
