import React from "react";
import { withApollo, withAuth, withDevice } from "../../src/libs/hoc";
import { PaymentHistoryPage } from "../../src/components/pages/ProfilePage/PaymentHistoryPage";

const Page = () => <PaymentHistoryPage />;

export default withApollo(withAuth(withDevice(Page)));
