import React from 'react';

import styles from './index.module.css';

interface Props {
  title: string;
  type: string;
  style: string;
}

export const PrimaryButton: React.FC<Props> = ({ title, type, style }) => {
  const composeClass = [ style, styles.btn, styles[type] ];
  return (
    <button className={composeClass.join(' ')} type='button'>
      {title}
    </button>
  );
};
