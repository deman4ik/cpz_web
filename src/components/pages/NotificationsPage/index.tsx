import React from 'react';
import { Template } from '../../layout/Template';

import useWindowDimensions from '../../../hooks/useWindowDimensions';
import { PageType } from '../../../config/types';

export const NotificationsPage = () => {
  const { width } = useWindowDimensions();
  return (
    <Template
      page={PageType.notifications}
      title='Notifications'
      width={width}
    >
      <div>
        Notification page ssfsdfsdfdsffffffffffffffffffffff
      </div>
    </Template>
  );
};
