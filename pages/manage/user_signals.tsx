import React from "react";
import { withApollo, withAuth, withDevice } from "libs/hoc";
// components
import { ManageUserSignals } from "components/pages/ManagePage";

const Page = () => <ManageUserSignals />;

export default withApollo(withAuth(withDevice(Page)));
