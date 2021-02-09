import React from "react";

import { ProfilePage } from "components/pages/ProfilePage";
import { withApollo, withAuth, withDevice } from "libs/hoc";

const Page = () => <ProfilePage />;

export default withApollo(withAuth(withDevice(Page)));
