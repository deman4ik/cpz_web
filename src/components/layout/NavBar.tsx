import React, { memo } from 'react';

import styles from './NavBar.module.css';

interface Props {
  title: string;
  subTitle?: string;
}

const _NavBar: React.FC<Props> = ({ title, subTitle }) => {
  return (
    <div className={styles.navBar}>
      <div className={styles.navBarTitleGroup}>
        <div className={styles.navBarTitle}>{title}</div>
      </div>
    </div>
  );
};

export const NavBar = memo(_NavBar);
