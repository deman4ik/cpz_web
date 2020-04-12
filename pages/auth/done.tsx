import React from 'react';
import { Done } from '../../src/components/pages/AuthPage/Done';
import { withApollo } from '../../src/libs/hoc';

const Page = () => (
  <Done />
);

export default withApollo(Page);
