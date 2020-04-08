import React from 'react';

import { WindowCloseIcon } from '../../../assets/icons/svg';
import { color } from '../../../config/constants';
import styles from './ModalTemplate.module.css';

interface Props {
  title?: string;
  footer?: JSX.Element;
}

export const ModalTemplate: React.FC<Props> = ({ children, title, footer }) => (
  <div className={styles.container}>
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
      <div>
        <WindowCloseIcon color={color.accent} size={26} />
      </div>
    </div>
  </div>
);
