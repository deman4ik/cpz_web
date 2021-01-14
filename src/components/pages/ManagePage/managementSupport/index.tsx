/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import React, { useState } from "react";
// graphql
import { SUPPORT_REQUESTS, SUPPORT_REQUESTS_AGGREGATE } from "graphql/manage/queries";
// utils
import { formatUsersSupportRequests, getSearchParams, getItemsCount } from "./utils";
// types
import { PageType } from "config/types";
import ManagePageTemplate from "../common/ManagePageTemplate";
import { USER_REQUESTS_TABLE_COLUMNS } from "./constants";
import { CaptionButton } from "components/basic";
import { AnnouncementModal } from "./components/AnnouncementModal";

const ManageSupportRequests = () => {
    const [announcementModalVisible, setAnnouncementModalVisibility] = useState(false);
    const toggleModal = () => {
        setAnnouncementModalVisibility(!announcementModalVisible);
    };

    const toolbar = <CaptionButton icon="announcement" title="Add news" onClick={toggleModal} />;
    return (
        <>
            <ManagePageTemplate
                pageType={PageType.managementSupport}
                columns={USER_REQUESTS_TABLE_COLUMNS}
                dataQuery={SUPPORT_REQUESTS}
                aggregateQuery={SUPPORT_REQUESTS_AGGREGATE}
                formatData={formatUsersSupportRequests}
                getSearchOptions={getSearchParams}
                getItemsCount={getItemsCount}
                toolbar={toolbar}
            />
            <AnnouncementModal isOpen={announcementModalVisible} onClose={toggleModal} />
        </>
    );
};

export default ManageSupportRequests;
