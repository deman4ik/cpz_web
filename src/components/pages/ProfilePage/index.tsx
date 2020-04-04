import React from 'react';
import { Template } from '../../layout/Template';

import useWindowDimensions from '../../../hooks/useWindowDimensions';
import { PageType } from '../../../config/types';

export const ProfilePage = () => {
  const { width } = useWindowDimensions();
  return (
    <Template
      page={PageType.profile}
      title='Profile'
      width={width}
    >
      <div>
        Profile
      </div>
    </Template>
  );
};
