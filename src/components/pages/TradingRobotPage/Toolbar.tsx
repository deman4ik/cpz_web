import React, { memo } from "react";

import { Button, CaptionButton } from "components/basic";
import { createVariable } from "./helpers";

interface Props {
    robotData: any;
    subscribe: (variables: any) => void;
}

const _Toolbar: React.FC<Props> = ({ robotData, subscribe }) => {
    const { userRobot } = robotData;
    const handleOnPressAction = (action: string) => {
        subscribe(createVariable(robotData, action));
    };

    return (
        <div className="toolbar">
            {!userRobot ? (
                <Button
                    icon="plus"
                    title="Add"
                    type="primary"
                    isUppercase
                    responsive
                    onClick={() => handleOnPressAction("create")}
                />
            ) : (
                <>
                    <CaptionButton
                        title="edit"
                        icon="settings"
                        responsive
                        onClick={() => handleOnPressAction("edit")}
                    />
                    {userRobot?.status === "stopped" ? (
                        <CaptionButton
                            title="delete"
                            icon="close"
                            responsive
                            onClick={() => handleOnPressAction("delete")}
                        />
                    ) : null}
                </>
            )}
        </div>
    );
};

export const Toolbar = memo(_Toolbar);
