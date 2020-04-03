import React from 'react';
import { PageHead, MainMenu, NavBar } from '.';

import { PageType } from '../../config/types';
import styles from './Template.module.css';

interface Props {
  title?: string;
  subTitle?: string;
  page?: PageType;
}

export const Template: React.FC<Props> = ({ title, subTitle, children, page }) => (
  <div className={styles.container}>
    <PageHead
      title={`${title}${subTitle ? `: ${subTitle}` : ''}`} />
    <div className={styles.mainMenuContainer}>
      <MainMenu activeTab={page} />
      <div className={styles.navBarContainer} />
      <div className={styles.wrapFixed}>
        <NavBar
          title={title}
          subTitle={subTitle} />
      </div>
    </div>
    <div className={styles.mainContainer}>
      {children}
    </div>
  </div>
);
