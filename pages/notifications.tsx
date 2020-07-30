import React from 'react';

import { NotificationsPage } from '../src/components/pages/NotificationsPage';
import { withApollo, withAuth, withDevice, withHeaders } from "../src/libs/hoc";

const Page = () => (
  <NotificationsPage />
);

export default withHeaders(withApollo(withAuth(withDevice(Page))));
