import React from 'react';

import { WindowCloseIcon } from '../../../assets/icons/svg';
import { color } from '../../../config/constants';
import styles from './ModalTemplate.module.css';

interface Props {
  title?: string;
  footer?: JSX.Element;
  children?: React.ReactNode;
  onClose: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const ModalTemplate: React.FC<Props> = ({ children, title, footer, onClose }) => (
  <div className={styles.content}>
    <div style={{ height: '100%' }}>
      {title && (
        <div className={styles.header}>
          <div className={styles.title}>{title}</div>
        </div>
      )}
      <div className={styles.body}>
        {children}
      </div>
      {footer && (
        <div className={styles.footer}>
          {footer}
        </div>
      )}
    </div>
    <div className={styles.icon} onClick={onClose}>
      <WindowCloseIcon color={color.accent} size={26} />
    </div>
  </div>
);
