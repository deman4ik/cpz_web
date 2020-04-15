import React from 'react';

import styles from './index.module.css';

interface Props {
  title: string;
  type: string;
  style?: object;
  className?: string;
  mini?: boolean;
  onClick?: () => void;
}

export const PrimaryButton: React.FC<Props> = ({ title, type, style, className, mini, onClick }) => {
  const getClassName = () => {
    const composeClass = [ styles.btn, (mini ? styles.miniBtn : styles.normalBtn), styles[type] ];
    if (className) composeClass.push(className);
    return composeClass;
  };

  return (
    <button className={getClassName().join(' ')} type='button' onClick={onClick} style={style}>
      {title}
    </button>
  );
};
