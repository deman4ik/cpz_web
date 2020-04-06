import React from 'react';
import { withApollo, withAuth } from '../../../src/libs/hoc';

import { SignalsRobotPage } from '../../../src/components/pages/SignalsRobotPage';

const Page = () => (
  <SignalsRobotPage />
);

export default withApollo(withAuth(Page));
