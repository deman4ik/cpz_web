import React from 'react';
import { Template } from '../../layout/Template';

import useWindowDimensions from '../../../hooks/useWindowDimensions';
import { PageType } from '../../../config/types';

export const SignalsPage = () => {
  const { width } = useWindowDimensions();
  return (
    <Template
      page={PageType.signals}
      title='Signals'
      width={width}
    >
      <div>
        Signals page
      </div>
    </Template>
  );
};
