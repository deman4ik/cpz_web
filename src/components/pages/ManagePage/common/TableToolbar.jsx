/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState } from "react";

import { CaptionButton, SearchInput } from "components/basic";

//TODO: Extract toolbar from Table component
// Requires mutating of higher-order TableColumns (different from columns created by react-table)
const TableToolbar = ({ itemsCount, onChangeSearch, toggleModal }) => {
    const [value, setValue] = useState("");

    return (
        <div
            style={{
                position: "absolute",
                top: 0,
                right: 10,
                zIndex: 105,
                height: "var(--header-height)",
                display: "flex",
                alignItems: "center"
            }}>
            <SearchInput
                placeholder={`Search through ${itemsCount} records...`}
                value={value || ""}
                onChange={(val) => {
                    setValue(val);
                    onChangeSearch(val);
                }}
            />
            <CaptionButton title="Configure" icon="settings" onClick={toggleModal} />
        </div>
    );
};

export default TableToolbar;
