import React, { useContext } from "react";

import useWindowDimensions from "hooks/useWindowDimensions";
import { useFetchData } from "./useFetchData";
import { NoRecentData, LoadingIndicator } from "components/common";
import { ToolbarNotificationsPage } from "./ToolbarNotificationsPage";
import { Template } from "components/layout";
import { PageType } from "config/types";
import { NotificationsContainer } from "./NotificationsContainer";
import { RedirectLoginButton } from "components/basic";

// context
import { AuthContext } from "libs/hoc/authContext";

export const NotificationsPage: React.FC = () => {
    /*Контекст аутентификации*/
    const {
        authState: { isAuth }
    } = useContext(AuthContext);

    const nothingComponent = isAuth ? (
        <NoRecentData message="You have no notifications yet" style={{ marginTop: 20 }} />
    ) : (
        <RedirectLoginButton style={{ margin: "200px auto" }} />
    );

    const { width } = useWindowDimensions();
    const {
        isLoadingMore,
        recordsCount,
        formatData,
        handleLoadMore,
        loading,
        inputSelect,
        setFilters
    } = useFetchData();

    return (
        <Template
            page={PageType.notifications}
            title="Notifications"
            width={width}
            toolbar={<ToolbarNotificationsPage inputSelect={inputSelect} setInputSelect={setFilters} />}>
            {loading ? (
                <div className="loading">
                    <LoadingIndicator />
                </div>
            ) : !formatData.length ? (
                nothingComponent
            ) : (
                <NotificationsContainer
                    handleLoadMore={handleLoadMore}
                    isLoadingMore={isLoadingMore}
                    recordsCount={recordsCount}
                    formatData={formatData}
                    width={width}
                />
            )}
        </Template>
    );
};
