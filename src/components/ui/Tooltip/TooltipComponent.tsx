import React from 'react';
import styles from './TooltipComponent.module.css';

interface Props {
  show: boolean;
  message: string;
}

export const TooltipComponent: React.FC<Props> = ({ show, message }) => (
  <div className={styles.tooltip} style={{ visibility: show ? 'visible' : 'hidden' }}>
    <div className={styles.text}>{message}</div>
  </div>
);
