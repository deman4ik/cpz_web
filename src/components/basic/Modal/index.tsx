/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import React from 'react';
import { ModalTemplate } from './ModalTemplate';

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

const backdropStyle: any = {
  position: 'fixed',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  zIndex: '9998',
  background: 'rgba(0, 0, 0, 0.3)'
};

const modalStyle: any = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: '9999',
  background: '#fff'
};

export const Modal: React.FC<Props> = props => {
  if (!props.isOpen) return null;

  if (props.width && props.height) {
    modalStyle.width = `${props.width}px`;
    modalStyle.height = `${props.height}px`;
    modalStyle.marginLeft = `-${props.width / 2}px`;
    modalStyle.marginTop = `-${props.height / 2}px`;
    modalStyle.transform = null;
  }

  if (props.style) {
    for (const key in props.style) {
      modalStyle[key] = props.style[key];
    }
  }

  if (props.backdropStyle) {
    for (const key in props.backdropStyle) {
      backdropStyle[key] = props.backdropStyle[key];
    }
  }

  const handleOnClickClose = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (props.onClose) {
      props.onClose(e);
    }
  };

  return (
    <div className={props.containerClassName}>
      <div className={props.className} style={modalStyle}>
        <ModalTemplate title={props.title} onClose={handleOnClickClose}>
          {props.children}
        </ModalTemplate>
      </div>
      {!props.noBackdrop && (
        <div
          className={props.backdropClassName}
          style={backdropStyle}
          onClick={handleOnClickClose} />
      )}
    </div>
  );
};
