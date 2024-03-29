import React, { memo } from "react";

import { useClearNotifications } from "hooks/useClearNotifications";
import { CaptionButton, Select } from "components/basic";
import { headerSelectData } from "./helpers";

interface Props {
    inputSelect: string;
    setInputSelect: (inputSelect: string) => void;
}

const _ToolbarNotificationsPage: React.FC<Props> = ({ inputSelect, setInputSelect }) => {
    const { updateNotifications } = useClearNotifications();

    return (
        <div className="toolbar">
            <div>
                <Select
                    data={headerSelectData}
                    width={110}
                    onChangeValue={(value) => setInputSelect(value)}
                    value={inputSelect}
                />
            </div>
            <CaptionButton title="Mark All as Read" icon="check" onClick={updateNotifications} />
        </div>
    );
};

export const ToolbarNotificationsPage = memo(_ToolbarNotificationsPage);
