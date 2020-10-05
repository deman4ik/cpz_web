import React, { memo, useEffect, useState } from "react";

import { useLogoutProcess } from "hooks/useLogoutProcess";
import { CaptionButton } from "components/basic";
import { LoadingIndicator } from "components/common";

const _ToolbarProfilePage: React.FC = () => {
    const [isLoading, setLoading] = useState(false);
    const [logout, { loading }] = useLogoutProcess();

    useEffect(() => {
        setLoading(loading);
    }, [loading]);

    return (
        <div className="toolbar">
            {isLoading ? (
                <LoadingIndicator />
            ) : (
                <CaptionButton title="Log out" icon="logout" responsive={false} onClick={logout} />
            )}
        </div>
    );
};

export const ToolbarProfilePage = memo(_ToolbarProfilePage);
