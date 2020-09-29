import React, { memo } from "react";

import { Button, CaptionButton } from "components/basic";
import { createVariable } from "./helpers";

interface Props {
    robotData: any;
    subscribe: (variables: any) => void;
}

const _Toolbar: React.FC<Props> = ({ robotData, subscribe }) => {
    const { isUserSubscribed } = robotData.robot;
    const handleOnPressAction = (action: string) => {
        subscribe(createVariable(robotData, action));
    };

    return (
        <div className="toolbar">
            {isUserSubscribed ? (
                <CaptionButton title="Edit" icon="settings" responsive onClick={() => handleOnPressAction("edit")} />
            ) : (
                <Button
                    type="primary"
                    title="Follow"
                    icon="plus"
                    isUppercase
                    responsive
                    onClick={() => handleOnPressAction("subscribe")}
                />
            )}
        </div>
    );
};

export const Toolbar = memo(_Toolbar);
