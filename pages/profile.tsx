import React from 'react';

import { ProfilePage } from '../src/components/pages/ProfilePage';
import { withApollo, withAuth, withDevice, withHeaders } from "../src/libs/hoc";

const Page = () => (
  <ProfilePage />
);

export default withHeaders(withApollo(withAuth(withDevice(Page))));
