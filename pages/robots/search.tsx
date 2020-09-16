import React from "react";

import { withApollo, withAuth, withDevice } from "libs/hoc";
import { RobotsSearchPage } from "components/pages/RobotsSearchPage";

const Page = () => <RobotsSearchPage />;

export default withApollo(withAuth(withDevice(Page)));
