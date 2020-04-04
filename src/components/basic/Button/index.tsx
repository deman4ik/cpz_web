import React from 'react';

import styles from './index.module.css';

interface Props {
  title: string;
  type: string;
  style?: string;
  mini?: boolean;
}

export const Button: React.FC<Props> = ({ title, type, style, mini }) => {
  const getClassName = () => {
    const composeClass = [ styles.btn, (mini ? styles.miniBtn : styles.normalBtn), styles[type] ];
    if (style) {
      composeClass.push(style);
    }
    return composeClass;
  };

  return (
    <button className={getClassName().join(' ')} type='button'>
      {title}
    </button>
  );
};
