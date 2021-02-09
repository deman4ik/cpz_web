import React from "react";

import { withApollo, withAuth, withDevice } from "libs/hoc";

import { SubscriptionHistoryPage } from "components/pages/ProfilePage/subscriptionHistoryPage";

const Page = () => <SubscriptionHistoryPage />;

export default withApollo(withAuth(withDevice(Page)));
