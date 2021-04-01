import React from "react";
import { withApollo, withAuth, withDevice } from "../../src/libs/hoc";
// components
import { ManageUserSignals } from "../../src/components/pages/ManagePage";

const Page = () => <ManageUserSignals />;

export default withApollo(withAuth(withDevice(Page)));
