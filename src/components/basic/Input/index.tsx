import React, { useState } from 'react';

import { Button } from '../Button';
import styles from './index.module.css';

interface Props {
  value: string;
  icon?: string;
  placeholder?: string;
  buttonTitle?: string;
  type?: string;
  onChangeText: (value) => void;
}

export const Input: React.FC<Props> =
({ value, icon, placeholder, buttonTitle, type = 'text', onChangeText }) => {
  //const [ inputValue, setInputValue ] = useState(value);
  const handleOnChange = (e) => {
    onChangeText(e.target.value);
    //setInputValue(e.target.value);
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
          type={type}
          className={styles.searchInput}
          placeholder={placeholder}
          maxLength={30}
          onChange={handleOnChange}
          value={value} />
      </div>
    </div>
  );
};
