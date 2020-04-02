/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { memo } from 'react';
import Link from 'next/link';

import { AlarmIcon, AssignmentIcon, MultiLineChartIcon, NotificationsIcon, HelpIcon, TelegramIcon } from '../../assets/icons/svg';
import styles from './MainMenu.module.css';

interface Props {
  item: any;
  active: boolean;
}

const components = {
  robot: AlarmIcon,
  signals: MultiLineChartIcon,
  notifications: NotificationsIcon,
  profile: AssignmentIcon,
  help: HelpIcon,
  telegram: TelegramIcon
};

const _MainMenuItem: React.FC<Props> = ({ item, active }) => {
  const styleText = [ styles.mainMenuItemText, active ? styles.menuActive : styles.menuInactive ];
  const SpecificIcon = components[item.icon];
  return (
    <div className={styles.mainMenuItemWrapper}>
      <div className={`${styles.mainMenuItem}${active ? ` ${styles.menuItemActive}` : ''}`}>
        <SpecificIcon color={active ? '#fff' : 'rgba(255, 255, 255, 0.68)'} />
        { item.route ? (
          <Link href={`/${item.route}`} replace>
            <a className={styleText.join(' ')}>{item.label}</a>
          </Link>
        ) :
          <a href={item.href} className={styleText.join(' ')}>{item.label}</a> }
      </div>
    </div>
  );
};

export const MainMenuItem = memo(_MainMenuItem);
