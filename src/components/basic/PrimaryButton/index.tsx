import React from 'react';

import styles from './index.module.css';

interface Props {
  title: string;
  type: string;
  style?: string;
}

export const PrimaryButton: React.FC<Props> = ({ title, type, style }) => {
  const composeClass = [ styles.btn, styles[type] ];
  if (style) {
    composeClass.push(style);
  }
  return (
    <button className={composeClass.join(' ')} type='button'>
      {title}
    </button>
  );
};
