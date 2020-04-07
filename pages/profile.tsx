import React from 'react';

import { ProfilePage } from '../src/components/pages/ProfilePage';
import { withApollo, withAuth } from '../src/libs/hoc';


const Page = () => (
  <ProfilePage />
);

export default withApollo(withAuth(Page));
