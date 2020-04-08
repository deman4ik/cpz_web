/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import React from 'react';

import { ModalTemplate } from './ModalTemplate';
import ClientOnlyPortal from '../../ClientOnlyPortal';
import styles from './index.module.css';

interface Props {
  isOpen: boolean;
  width?: number;
  height?: number;
  style?: any;
  backdropStyle?: any;
  children?: React.ReactNode;
  containerClassName?: string;
  backdropClassName?: string;
  className?: string;
  noBackdrop?: boolean;
  onClose: React.MouseEventHandler;
  title?: string;
}

export const Modal: React.FC<Props> = props => {
  if (!props.isOpen) return null;

  // if (props.width && props.height) {
  //   modalStyle.width = `${props.width}px`;
  //   modalStyle.height = `${props.height}px`;
  //   modalStyle.marginLeft = `-${props.width / 2}px`;
  //   modalStyle.marginTop = `-${props.height / 2}px`;
  //   modalStyle.transform = null;
  // }

  // if (props.style) {
  //   for (const key in props.style) {
  //     modalStyle[key] = props.style[key];
  //   }
  // }

  // if (props.backdropStyle) {
  //   for (const key in props.backdropStyle) {
  //     backdropStyle[key] = props.backdropStyle[key];
  //   }
  // }

  const handleOnClickClose = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (props.onClose) {
      props.onClose(e);
    }
  };

  return (
    <ClientOnlyPortal selector='#modal'>
      <div className={styles.backdrop} onClick={handleOnClickClose}>
        <div className={styles.modal}>
          <ModalTemplate title={props.title} onClose={handleOnClickClose}>
            {props.children}
          </ModalTemplate>
        </div>
      </div>
    </ClientOnlyPortal>
  );
};
