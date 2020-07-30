import React from 'react';
import { ForgotPassword } from '../../src/components/pages/AuthPage/ForgotPassword';
import { withApollo } from '../../src/libs/hoc';

const Page = () => (
  <ForgotPassword />
);

export default withApollo(Page);
