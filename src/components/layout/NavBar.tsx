import React, { memo } from 'react';

import styles from './NavBar.module.css';

interface Props {
  title: string;
  subTitle?: string;
}

const _NavBar: React.FC<Props> = ({ title, subTitle }) => {
  return (
    <div className={styles.navBar}>
      <div className={styles.titleGroup}>
        <div className={styles.title}>{title}</div>
        <div className={styles.subTitle}>{subTitle}</div>
      </div>
    </div>
  );
};

export const NavBar = memo(_NavBar);
