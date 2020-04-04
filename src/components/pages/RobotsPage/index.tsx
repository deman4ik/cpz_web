import React from 'react';
import { Template } from '../../layout/Template';

import useWindowDimensions from '../../../hooks/useWindowDimensions';
import { PageType } from '../../../config/types';

export const RobotsPage = () => {
  const { width } = useWindowDimensions();
  return (
    <Template
      page={PageType.robots}
      title='Robots'
      width={width}
  >
      <div>
        Robots page
      </div>
    </Template>
  );
};
