import React from "react";
import { LandingPage } from "../src/components/pages/LandingPage";
import { withApollo, withAuth, withDevice } from "../src/libs/hoc";

const Page = () => <LandingPage />;

export default withApollo(withAuth(withDevice(Page)));
