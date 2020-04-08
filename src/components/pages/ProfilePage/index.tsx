import React from 'react';
import { Template } from '../../layout/Template';

import useWindowDimensions from '../../../hooks/useWindowDimensions';
import { ExchangeKeys } from './ExchangeKeys';
import { UserContainer } from './UserContainer';
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
      <UserContainer />
      <ExchangeKeys
        title='My Exchange API Keys' />
      <NotifySettings />
    </Template>
  );
};
