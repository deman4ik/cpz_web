import React, { useContext } from "react";

// hooks
import useWindowDimensions from "hooks/useWindowDimensions";
import { useFetchData } from "./useFetchData";
// components
import { LoadingIndicator } from "components/common";
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
    const { isLoadingMore, recordsCount, formatData, handleLoadMore, loading, inputSelect, setFilters } = useFetchData(
        true
    );

    return (
        <DefaultTemplate
            page={PageType.notifications}
            title="Notifications"
            width={width}
            toolbar={isAuth && <ToolbarNotificationsPage inputSelect={inputSelect} setInputSelect={setFilters} />}>
            {loading ? (
                <div className="loading">
                    <LoadingIndicator />
                </div>
            ) : !formatData.length ? (
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
                    formatData={formatData}
                    width={width}
                />
            )}
        </DefaultTemplate>
    );
};
