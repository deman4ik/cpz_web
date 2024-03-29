import React, { memo } from "react";
import Router from "next/router";

import { CaptionButton } from "../basic";

interface Props {
    displayType: string;
}

const _PageToolbar: React.FC<Props> = ({ displayType }) => {
    const handleOnPress = () => {
        Router.push(`/${displayType}/search`);
    };

    return (
        <div className="toolbar">
            <CaptionButton title={`Add ${displayType}`} icon="plus" onClick={handleOnPress} />
        </div>
    );
};

export const PageToolbar = memo(_PageToolbar);
