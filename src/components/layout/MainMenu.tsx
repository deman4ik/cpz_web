import React, { memo } from 'react';

import { MAINMENU_ITEMS } from './helpers';
import { MainMenuItem } from './MainMenuItem';
import logoAccent from '../../assets/img/logo-accent.png';
import { PageType } from '../../config/types';
import styles from './MainMenu.module.css';

interface Props {
  activeTab: PageType;
}

// const bigLogo = { width: 72, height: 71 };
// const smallLogo = { width: 30, height: 29 };

const _MainMenu: React.FC<Props> = ({ activeTab }) => {
  return (
    <div className={styles.mainMenu}>
      <img className={`${styles.logo} ${styles.bigLogo}`} src={logoAccent} alt='' />
      <div className={styles.menuContainer}>
        {MAINMENU_ITEMS.map(item => (
          <MainMenuItem key={item.label} item={item} active={activeTab === item.label} />
        ))}
      </div>
    </div>
  );
};

export const MainMenu = memo(_MainMenu);
