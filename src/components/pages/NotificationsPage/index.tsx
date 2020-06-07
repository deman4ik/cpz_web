import React from "react";

import useWindowDimensions from "hooks/useWindowDimensions";
import { useFetchData } from "./useFetchData";
import { LoadingIndicator } from "components/common";
import { ToolbarNotificationsPage } from "./ToolbarNotificationsPage";
import { Template } from "components/layout";
import { PageType } from "config/types";
import { NotificationsContainer } from "./NotificationsContainer";
import NothingComponent from "components/common/NothingComponent";

export const NotificationsPage: React.FC = () => {
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
        </Template>
    );
};
