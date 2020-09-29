import React from 'react';
import { withApollo, withAuth, withDevice } from '../../src/libs/hoc';

import { SignalRobotsInfoPage } from '../../src/components/pages/SignalRobotsInfoPage';

const Page = () => (
  <SignalRobotsInfoPage />
);

export default withApollo(withAuth(withDevice(Page)));
