import React from "react";
import { withApollo, withAuth, withDevice } from "libs/hoc";
import { SubscriptionHistoryPage } from "components/pages/ProfilePage/SubscriptionHistoryPage";

const Page = () => <SubscriptionHistoryPage />;

export default withApollo(withAuth(withDevice(Page)));
