import React from 'react';

import { UserInfo } from './UserInfo';
import { AccountBalance } from './AccountBalance';
import styles from './UserContainer.module.css';

export const UserContainer: React.FC = () => (
  <div className={styles.blocksContainer}>
    <div className={styles.block}>
      <UserInfo />
    </div>
    <div className={styles.block}>
      <AccountBalance />
    </div>
  </div>
);
