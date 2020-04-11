import React from 'react';
import { ForgotPassword } from '../../src/components/pages/AuthPage/ForgotPassword';
import { withAuth, withApollo } from '../../src/libs/hoc';

const Page = () => (
  <ForgotPassword />
);

export default withApollo(withAuth(Page));
