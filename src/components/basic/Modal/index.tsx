import React from 'react';

import { ModalTemplate } from './ModalTemplate';
import ClientOnlyPortal from '../../../libs/ClientOnlyPortal';
import styles from './index.module.css';

interface Props {
  isOpen: boolean;
  children?: React.ReactNode;
  onClose: React.MouseEventHandler;
  title?: string;
}

export const Modal: React.FC<Props> = props => {
  if (!props.isOpen) return null;

  const handleOnClickClose = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (props.onClose) {
      props.onClose(e);
    }
  };

  return (
    <ClientOnlyPortal selector='#modal'>
      <div className={styles.backdrop}>
        <div className={styles.modal}>
          <ModalTemplate title={props.title} onClose={handleOnClickClose}>
            {props.children}
          </ModalTemplate>
        </div>
      </div>
    </ClientOnlyPortal>
  );
};
