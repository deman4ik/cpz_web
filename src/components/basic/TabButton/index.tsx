/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import styles from './index.module.css';

interface Props {
  title: string;
  isActive: boolean;
  handleOnClick: () => void;
  textStyle?: string;
  objectStyle? : string;
}

export const TabButton: React.FC<Props> = ({ title, isActive, handleOnClick, textStyle, objectStyle }) => {
  const getBtnStyle = () => {
    const btn = [ styles.btn ];
    if (isActive) btn.push(styles.isActive);
    if (objectStyle) btn.push(objectStyle);
    return btn;
  };

  const getBtnTextStyle = () => {
    const btnText = [ styles.btnText ];
    if (isActive) btnText.push(styles.isActive);
    if (objectStyle) btnText.push(textStyle);
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
