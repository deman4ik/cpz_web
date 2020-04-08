import React from 'react';

import { UserInfo } from './UserInfo';
import { AccountBalance } from './AccountBalance';

export const UserContainer: React.FC = () => (
  <div className={styles.blocksContainer}>
    <div style={styles.block}>
      <UserInfo />
    </div>
    <div className={styles.block}>
      <AccountBalance />
    </div>
  </div>
);
