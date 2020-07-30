import React from 'react';
import { RecoverPasswordWeb } from '../../../src/components/pages/AuthPage/RecoverPasswordWeb';
import { withApollo } from '../../../src/libs/hoc';

const Page = () => (
  <RecoverPasswordWeb />
);

export default withApollo(Page);
