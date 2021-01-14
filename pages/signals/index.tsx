import SignalRobotsInfoPage from "components/pages/SignalRobotsInfoPage";
import React from "react";
import { withApollo, withAuth, withDevice } from "../../src/libs/hoc";

const Page = () => <SignalRobotsInfoPage />;

export default withApollo(withAuth(withDevice(Page)));
