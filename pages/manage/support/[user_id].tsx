import React from "react";
import { withApollo, withAuth, withDevice } from "libs/hoc";
// components
import { ManageSupportChat } from "components/pages/ManagePage";

const Page = () => <ManageSupportChat />;

export default withApollo(withAuth(withDevice(Page)));
