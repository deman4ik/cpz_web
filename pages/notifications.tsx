import React from 'react';

import { NotificationsPage } from '../src/components/pages/NotificationsPage';
import { withApollo, withAuth, withDevice } from '../src/libs/hoc';

const Page = () => (
  <NotificationsPage />
);

export default withApollo(withAuth(withDevice(Page)));
