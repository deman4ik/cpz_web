/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

import { AlarmIcon, AssignmentIcon, MultiLineChartIcon, NotificationsIcon } from '../../assets/icons/svg';
import styles from './MainMenu.module.css';

interface Props {
  item: any;
  active: boolean;
  handleOnClick: (path: string, external: boolean) => void;
}

const components = {
  robot: AlarmIcon,
  signals: MultiLineChartIcon,
  notifications: NotificationsIcon,
  profile: AssignmentIcon,
};

export const MainMenuItemMobile: React.FC<Props> = ({ item, active, handleOnClick }) => {
  const SpecificIcon = components[item.icon];

  const handleOnClickLink = () => {
    handleOnClick(item.route, false);
  };

  return (
    <div className={styles.mainMenuItemWrapper}>
      <div className={`${styles.mainMenuItem}${active ? ` ${styles.menuItemActive}` : ''}`} onClick={handleOnClickLink}>
        <SpecificIcon color={active ? '#fff' : 'rgba(255, 255, 255, 0.68)'} />
      </div>
    </div>
  );
};
