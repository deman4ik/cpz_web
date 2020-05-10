import React, { memo } from 'react';
import Router from 'next/router';

import { ChevronLeftIcon } from '../../../../assets/icons/svg';
import styles from './CartFooter.module.css';

const _CartFooter: React.FC = () => {
  const handleSwitchBackToLogin = () => {
    Router.push('/auth/login');
  };

  return (
      <div className={styles.footer}>
          <div className={styles.wrapper}>
          <div className={styles.iconGroup} onClick={handleSwitchBackToLogin}>
                  <ChevronLeftIcon size={20} />
                  <div className={styles.text}>Back to login</div>
                </div>
            </div>
        </div>
  );
};

export const CartFooter = memo(_CartFooter);
