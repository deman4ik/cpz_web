/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { memo } from 'react';

import { AlarmIcon } from '../../assets/icons/svg';
import styles from './MainMenu.module.css';

interface Props {
  item: any;
  active: boolean;
}

const _MainMenuItem: React.FC<Props> = ({ item, active }) => {
  const styleText = [ styles.mainMenuItemText, active ? styles.menuActive : styles.menuInactive ];
  const handleOnClick = () => {
    console.log(item.label);
  };
  return (
    <div
      className={`${styles.mainMenuItem}${active ? ` ${styles.menuItemActive}` : ''}`}
      onKeyPress={handleOnClick}
      onClick={handleOnClick}>
      <AlarmIcon color={active ? '#fff' : 'rgba(255, 255, 255, 0.68)'} />
      <span className={styleText.join(' ')}>{item.label}</span>
    </div>
  );
};

export const MainMenuItem = memo(_MainMenuItem);
