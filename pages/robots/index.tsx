import React from 'react';

import { withApollo, withAuth } from '../../src/libs/hoc';
import { RobotsPage } from '../../src/components/pages/RobotsPage';

const Page = () => (
  <RobotsPage />
);

export default withApollo(withAuth(Page));
