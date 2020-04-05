/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect } from 'react';

import { color } from '../../../config/constants';
import { CloseIcon, MagnifyIcon } from '../../../assets/icons/svg';
import styles from './index.module.css';

interface Props {
  value: string;
  onChange: (str: string) => void;
  placeholder: string;
  width: number;
}

export const SearchInput: React.FC<Props> = ({ value, onChange, placeholder, width }) => {
  useEffect(() => () => { onChange(''); }, []);

  const handleOnChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        { value.length ? (
          <div className={styles.icon} onClick={() => onChange('')}>
            <CloseIcon color={color.accent} size={16} />
          </div>
        ) : (
          <div className={styles.icon}>
            <MagnifyIcon color={color.accent} size={16} />
          </div>
        ) }
        <input
          type='text'
          className={styles.searchInput}
          placeholder={placeholder || 'Search...'}
          onChange={handleOnChange}
          value={value} />
      </div>
    </div>
  );
};
