import React from "react";

import { withApollo, withAuth, withDevice } from "../../../src/libs/hoc";
import { ManageRobotsStats } from "../../../src/components/pages/ManagePage/robotStats";

const Page = () => <ManageRobotsStats />;

export default withApollo(withAuth(withDevice(Page)));
