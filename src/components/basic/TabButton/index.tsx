/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import styles from './index.module.css';

interface Props {
  title: string;
  isActive: boolean;
  handleOnClick: () => void;
  textClassName?: string;
  objectClassName? : string;
}

export const TabButton: React.FC<Props> = ({ title, isActive, handleOnClick, textClassName, objectClassName }) => {
  const getBtnStyle = () => {
    const btn = [ styles.btn ];
    if (isActive) btn.push(styles.isActive);
    if (objectClassName) btn.push(objectClassName);
    return btn;
  };

  const getBtnTextStyle = () => {
    const btnText = [ styles.btnText, isActive ? styles.isActive : styles.btnTextColor ];
    if (textClassName) btnText.push(textClassName);
    return btnText;
  };

  return (
    <div
      className={getBtnStyle().join(' ')}
      onClick={handleOnClick}
    >
      <div className={getBtnTextStyle().join(' ')}>
        {title}
      </div>
    </div>
  );
};
