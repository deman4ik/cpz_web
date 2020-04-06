import React from 'react';
import styles from './NoRecentData.module.css';

interface Props {
  message: string;
}

export const NoRecentData: React.FC<Props> = ({ message }) => (
  <div className={styles.container}>
    {message}
  </div>
);
