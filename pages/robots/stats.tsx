import React from 'react';

import { withApollo, withAuth } from '../../src/libs/hoc';
import { StatsPage } from '../../src/components/pages/StatsPage';

const Page = () => (
  <StatsPage />
);

export default withApollo(withAuth(Page));
