import React, { memo } from 'react';

import { SupportItem } from './SupportItem';
import { supportContent } from '../helpers';
import styles from './index.module.css';

const _Support: React.FC = () => (
  <>
    <div className={styles.title}>Support</div>
    <div className={styles.support}>
      <div className={styles.grid}>
        { supportContent().map(item => (
          <SupportItem item={item} key={item.icon} />
        )) }
      </div>
    </div>
  </>
);

export const Support = memo(_Support);