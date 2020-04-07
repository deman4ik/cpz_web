import React from 'react';
import { Template } from '../../layout/Template';

import useWindowDimensions from '../../../hooks/useWindowDimensions';
import { ExchangeKeys } from './ExchangeKeys';
import { NotifySettings } from './NotifySettings';
import { PageType } from '../../../config/types';

export const ProfilePage = () => {
  const { width } = useWindowDimensions();
  return (
    <Template
      page={PageType.profile}
      title='Profile'
      subTitle='Settings'
      width={width}
    >
      <ExchangeKeys
        title='My Exchange API Keys' />
      <NotifySettings />
    </Template>
  );
};
