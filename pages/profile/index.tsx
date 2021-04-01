import React from "react";
import { ProfilePage } from "../../src/components/pages/ProfilePage";
import { withApollo, withAuth, withDevice } from "../../src/libs/hoc";

const Page = () => <ProfilePage />;

export default withApollo(withAuth(withDevice(Page)));
