import React from "react";
import { withApollo, withAuth, withDevice } from "libs/hoc";
import { PaymentHistoryPage } from "components/pages/ProfilePage/PaymentHistoryPage";

const Page = () => <PaymentHistoryPage />;

export default withApollo(withAuth(withDevice(Page)));
