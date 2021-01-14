import React, { memo } from "react";
import { CaptionButton } from "components/basic";

interface Props {
    toggleFiltersVisibility: () => void;
}

const _StatsPageButtonToolbar: React.FC<Props> = ({ toggleFiltersVisibility }) => (
    <div className="toolbar">
        <CaptionButton title="filter" icon="filtervariant" onClick={toggleFiltersVisibility} />
    </div>
);

export const StatsPageButtonToolbar = memo(_StatsPageButtonToolbar);
