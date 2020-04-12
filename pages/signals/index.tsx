import React from 'react';
import { withApollo, withAuth, withDevice } from '../../src/libs/hoc';

import { SignalsPage } from '../../src/components/pages/SignalsPage';

const Page = () => (
  <SignalsPage />
);

export default withApollo(withAuth(withDevice(Page)));
