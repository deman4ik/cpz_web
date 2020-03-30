import React, { memo } from 'react';

import styles from './NavBar.module.css';

interface Props {
  title: string;
  subTitle?: string;
}

const _NavBar: React.FC<Props> = ({ title, subTitle }) => {
  return (
    <div className={styles.navBar}>
      {title}
    </div>
  );
};

export const NavBar = memo(_NavBar);