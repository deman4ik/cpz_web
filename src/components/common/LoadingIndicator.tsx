import React from 'react';
import Spinner from 'react-activity/lib/Spinner';

import styles from './LoadingIndicator.module.css';

interface Props {
  style?: object;
}

export const LoadingIndicator: React.FC<Props> = ({ style }) => (
  <div className={styles.indicator} style={style}>
    <Spinner />
  </div>
);
