import React, { memo } from 'react';

import { useClearNotifications } from '../../../hooks/useClearNotifications';
import { CaptionButton, Select } from '../../basic';
import { headerSelectData } from './helpers';

interface Props {
  inputSelect: string;
  setInputSelect: (inputSelect: string) => void;
}

const _ToolbarNotificationsPage: React.FC<Props> = ({ inputSelect, setInputSelect }) => {
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
