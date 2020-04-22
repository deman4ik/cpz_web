import React from 'react';

import { EffectButton } from '..';
import { color } from '../../../config/constants';
import styles from './ModalTemplate.module.css';

interface Props {
  title: string;
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
    <div className={styles.icon}>
      <EffectButton icon='windowclose' color={color.accent} onClick={onClose} />
    </div>
  </div>
);
