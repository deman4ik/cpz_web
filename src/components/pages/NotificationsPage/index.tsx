import React, { useContext } from "react";

// hooks
import useWindowDimensions from "hooks/useWindowDimensions";
import { useFetchNotifications } from "./useFetchNotifications";
// components
import { ToolbarNotificationsPage } from "./ToolbarNotificationsPage";
import { DefaultTemplate } from "components/layout";
import { NotificationsContainer } from "./NotificationsContainer";
import NothingComponent from "components/common/NothingComponent";
// types
import { PageType } from "config/types";
// context
import { AuthContext } from "libs/hoc/context";

export const NotificationsPage: React.FC = () => {
    /*Контекст аутентификации*/
    const {
        authState: { isAuth }
    } = useContext(AuthContext);

    const { width } = useWindowDimensions();
    const {
        isLoadingMore,
        recordsCount,
        notifications,
        handleLoadMore,
        inputSelect,
        setFilters
    } = useFetchNotifications(true);

    return (
        <DefaultTemplate
            page={PageType.notifications}
            title="Notifications"
            toolbar={isAuth && <ToolbarNotificationsPage inputSelect={inputSelect} setInputSelect={setFilters} />}>
            {!notifications.length ? (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: "450px"
                    }}>
                    <NothingComponent beforeButtonKeyWord="notifications" buttonSize="normal" />
                </div>
            ) : (
                <NotificationsContainer
                    handleLoadMore={handleLoadMore}
                    isLoadingMore={isLoadingMore}
                    recordsCount={recordsCount}
                    notifications={notifications}
                    width={width}
                />
            )}
        </DefaultTemplate>
    );
};
