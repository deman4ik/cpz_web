/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from "react";

import { SearchInput } from "components/basic";
import useWindowDimensions from "hooks/useWindowDimensions";
import { useShowDimension } from "hooks/useShowDimension";
import { SCREEN_TYPE } from "config/constants";

export function GlobalFilter({ itemsCount, onChangeSearch }) {
    const { width } = useWindowDimensions();
    const { showDimension: isPlaceholderShort } = useShowDimension(width, SCREEN_TYPE.SMALLEST);
    const [value, setValue] = React.useState("");
    const placeholder = isPlaceholderShort ? `Search through ${itemsCount} records...` : "Search...";
    return (
        <SearchInput
            placeholder={placeholder}
            value={value || ""}
            onChange={(val) => {
                setValue(val);
                onChangeSearch(val);
            }}
        />
    );
}
