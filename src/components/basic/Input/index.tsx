import React, { useState } from 'react';

import { Button } from '../Button';
import styles from './index.module.css';

interface Props {
  value: string;
  icon?: string;
  placeholder?: string;
  buttonTitle?: string;
}

export const Input: React.FC<Props> = ({ value, icon, placeholder, buttonTitle }) => {
  const [ inputValue, setInputValue ] = useState(value);
  const handleOnChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        { icon ? (
          <div className={styles.icon}>
            <Button
              title={buttonTitle || 'Change'}
              type='dimmed'
              responsive
              icon={icon} />
          </div>
        ) : null}
        <input
          type='text'
          className={styles.searchInput}
          placeholder={placeholder}
          maxLength={30}
          onChange={handleOnChange}
          value={inputValue} />
      </div>
    </div>
  );
};
