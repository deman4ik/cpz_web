import React from "react";

import useWindowDimensions from "../../../hooks/useWindowDimensions";
import { useFetchData } from "./useFetchData";
import { NoRecentData, LoadingIndicator } from "../../common";
import { ToolbarNotificationsPage } from "./ToolbarNotificationsPage";
import { Template } from "../../layout";
import { PageType } from "../../../config/types";
import { NotificationsContainer } from "./NotificationsContainer";

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
                <NoRecentData message="You have no notifications yet" style={{ marginTop: 20 }} />
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
