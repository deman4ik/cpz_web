/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from "react";

import { SearchInput } from "components/basic";

export function GlobalFilter({ itemsCount, onChangeSearch }) {
    const [value, setValue] = React.useState("");

    return (
        <SearchInput
            placeholder={`Search through ${itemsCount} records...`}
            value={value || ""}
            onChange={(val) => {
                setValue(val);
                onChangeSearch(val);
            }}
        />
    );
}
