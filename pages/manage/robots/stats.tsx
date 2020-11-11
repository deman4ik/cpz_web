import React from "react";

import { withApollo, withAuth, withDevice } from "libs/hoc";
import { ManageRobotsStats } from "components/pages/ManagePage/robotStats";

const Page = () => <ManageRobotsStats />;

export default withApollo(withAuth(withDevice(Page)));