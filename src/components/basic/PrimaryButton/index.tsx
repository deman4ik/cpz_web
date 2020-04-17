import React from 'react';

import styles from './index.module.css';

interface Props {
  title: string;
  type: string;
  style?: object;
  className?: string;
  mini?: boolean;
  href: string;
}

export const PrimaryButton: React.FC<Props> = ({ title, type, style, className, mini, href }) => {
  const getClassName = () => {
    const composeClass = [ styles.btn, (mini ? styles.miniBtn : styles.normalBtn), styles[type] ];
    if (className) composeClass.push(className);
    return composeClass;
  };

  return (
    <a className={getClassName().join(' ')} style={style} href={href}>
      {title}
    </a>
  );
};
