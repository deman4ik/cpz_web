import React from 'react';

import { withApollo, withAuth } from '../../src/libs/hoc';
import { SignalsSearchPage } from '../../src/components/pages/SignalsSearchPage';

const Page = () => (
  <SignalsSearchPage />
);

export default withApollo(withAuth(Page));
