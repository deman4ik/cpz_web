import React from 'react';

import { withApollo, withAuth, withDevice } from '../../src/libs/hoc';
import { RobotsPage } from '../../src/components/pages/RobotsPage';

const Page = () => (
  <RobotsPage />
);

export default withApollo(withAuth(withDevice(Page)));
