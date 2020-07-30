import React from "react";
import { LandingPage } from "../src/components/pages/LandingPage";
import { withApollo, withAuth, withDevice, withHeaders } from "../src/libs/hoc";

const Page = () => <LandingPage />;

export default withHeaders(withApollo(withAuth(withDevice(Page))));
