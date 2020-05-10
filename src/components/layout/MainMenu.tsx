import React, { memo } from 'react';
import { useRouter } from 'next/router';

import { MAINMENU_ITEMS, MAINMENU_DESKTOP_ITEMS } from './helpers';
import { MainMenuItem } from './MainMenuItem';
import { MainMenuItemMobile } from './MainMenuItemMobile';
import logoAccent from '../../assets/img/logo-accent.png';
import { PageType } from '../../config/types';
import styles from './MainMenu.module.css';

interface Props {
  activeTab: PageType;
  showDesktop: boolean;
}

const _MainMenu: React.FC<Props> = ({ activeTab, showDesktop }) => {
  const router = useRouter();
  const handleOnClick = (path: string, external: boolean) => {
    if (external) {
      window.location.assign(path);
    } else {
      router.push(`/${path}`).then(() => window.scrollTo(0, 0));
    }
  };

  return (
      <>
      {showDesktop ? (
              <div className={styles.mainMenu}>
                  <img className={`${styles.logo} ${styles.bigLogo}`} src={logoAccent} alt='' />
                  <div className={styles.menuContainer}>
                        {MAINMENU_ITEMS.map((item) => (
                      <MainMenuItem
                                key={item.label}
                              item={item}
                              active={activeTab === item.label}
                                handleOnClick={handleOnClick}
                            />
                    ))}
                    </div>
                    <div className={styles.menuGroupLine} />
                    <div className={styles.menuContainer}>
                        {MAINMENU_DESKTOP_ITEMS.map((item) => (
                            <MainMenuItem key={item.label} item={item} active={false} handleOnClick={handleOnClick} />
                      ))}
                </div>
                  <div className={styles.menuGroupLine} />
                </div>
            ) : (
                <div className={styles.mainMenuMobile}>
                    {MAINMENU_ITEMS.map((item) => (
                    <MainMenuItemMobile
                        key={item.label}
                            item={item}
                        active={activeTab === item.label}
                            handleOnClick={handleOnClick}
                        />
                  ))}
              </div>
            )}
        </>
  );
};

export const MainMenu = memo(_MainMenu);
