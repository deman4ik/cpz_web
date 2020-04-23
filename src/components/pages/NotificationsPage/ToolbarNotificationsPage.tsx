import React, { useState, memo } from 'react';

import { useClearNotifications } from '../../../hooks/useClearNotifications';
import { CaptionButton, Select } from '../../basic';
import { headerSelectData } from './helpers';

const _ToolbarNotificationsPage: React.FC = () => {
  const [ inputSelect, setInputSelect ] = useState('all');
  const { updateNotifications } = useClearNotifications();

  return (
    <div className='toolbar'>
      <div>
        <Select
          data={headerSelectData}
          width={110}
          onValueChange={value => setInputSelect(value)}
          value={inputSelect} />
      </div>
      <CaptionButton
        title='Mark All as Readed'
        icon='check'
        onClick={updateNotifications} />
    </div>
  );
};

export const ToolbarNotificationsPage = memo(_ToolbarNotificationsPage);
