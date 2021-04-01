import React from "react";
import { withApollo, withAuth, withDevice } from "../../../src/libs/hoc";
// components
import { ManageSupportChat } from "../../../src/components/pages/ManagePage";

const Page = () => <ManageSupportChat />;

export default withApollo(withAuth(withDevice(Page)));
