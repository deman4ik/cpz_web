import React, { memo } from 'react';

import { EffectButton } from '../basic/EffectButton';
import styles from './NavBar.module.css';

interface Props {
  title: string;
  subTitle?: string;
  toolbar: any;
  handlePressBack: () => void;
}

const _NavBar: React.FC<Props> = ({ title, subTitle, toolbar, handlePressBack }) => (
  <div className={styles.navBar}>
    <div className={styles.wrapper}>
      {handlePressBack ?
        <EffectButton onClick={handlePressBack} icon='arrowleft' /> : null}
      <div className={styles.titleGroup} style={{ marginLeft: handlePressBack ? 38 : 10 }}>
        <div className={styles.title}>{title}</div>
        <div className={styles.subTitle}>{subTitle}</div>
      </div>
      {toolbar}
    </div>
  </div>
);

export const NavBar = memo(_NavBar);
