import React from 'react';
import { Activate } from '../../src/components/pages/AuthPage/Activate';
import { withApollo } from '../../src/libs/hoc';

const Page = () => (
  <Activate />
);

export default withApollo(Page);
