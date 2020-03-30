import React from 'react';
import { PageHead, MainMenu } from '.';

import styles from './Template.module.css';

interface Props {
  title?: string;
  subTitle?: string;
}

export const Template: React.FC<Props> = ({ title, subTitle, children }) => (
  <div className={styles.container}>
    <PageHead
      title={`${title}${subTitle ? `: ${subTitle}` : ''}`} />
    <div className={styles.mainMenuContainer}>
      <MainMenu />
      <div className={styles.mainContainer}>
        {children}
      </div>
    </div>
  </div>
);
