import React, { ReactNode } from 'react';

import { ChevronDownIcon, ChevronUpIcon } from '../../../assets/icons/svg';
import styles from './index.module.css';

interface Props {
  title?: ReactNode;
  left?: ReactNode;
}

export const Accordion: React.FC<Props> = ({ title, children, left }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {left}
        {title}
        <div className={styles.icon}>
          <ChevronDownIcon />
        </div>
      </div>
      <div>
        {children}
      </div>
    </div>
  );
};
