import React, { memo } from 'react';

import styles from './NavBar.module.css';

interface Props {
  title: string;
  subTitle?: string;
  toolbar: any;
}

const _NavBar: React.FC<Props> = ({ title, subTitle, toolbar }) => (
  <div className={styles.navBar}>
    <div className={styles.wrapper}>
      <div className={styles.titleGroup}>
        <div className={styles.title}>{title}</div>
        <div className={styles.subTitle}>{subTitle}</div>
      </div>
      {toolbar}
    </div>
  </div>
);

export const NavBar = memo(_NavBar);
