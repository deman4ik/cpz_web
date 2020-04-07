import React, { PropsWithChildren, memo } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';

import { useClearNotifications } from '../../../hooks/useClearNotifications';
import { ScreenTypeProps } from '../../../services/Screen';
import { Button } from '../../basic';

interface Props extends PropsWithChildren<WithTranslation> {
  screenType: ScreenTypeProps;
}

const _ToolbarNotificationsPage: React.FC<Props> = ({ t, screenType }) => {
  const maxTablet = screenType.maxTablet();
  const { updateNotifications } = useClearNotifications();

  return (
    <Button
      title={maxTablet ? null : t('Mark All as Readed')}
      icon='check'
      isUppercase
      onPress={updateNotifications} />
  );
};

export const ToolbarNotificationsPage = memo(withTranslation()(_ToolbarNotificationsPage));
