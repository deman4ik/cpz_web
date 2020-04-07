import React from 'react';

import { NotificationsPage } from '../src/components/pages/NotificationsPage';
import { withApollo, withAuth } from '../src/libs/hoc';

const Page = () => (
  <NotificationsPage />
);

export default withApollo(withAuth(Page));
