import React from 'react';

import { CheckIcon } from '../../../assets/icons/svg';
import styles from './index.module.css';

interface Props {
  checked: boolean;
  label?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export const CheckBox: React.FC<Props> = ({ checked, label, disabled, onClick }) => {
  const getCheckboxStyle = () => {
    const style = [ styles.checkbox, checked ? styles.checked : styles.unchecked ];
    return style;
  };

  const handleOnClick = () => {
    if (!disabled) {
      onClick();
    }
  };

  return (
    <div className={styles.checkBoxWrapper}>
      <div className={getCheckboxStyle().join(' ')} onClick={handleOnClick}>
        { checked ? (
          <div className={styles.checkedIcon}>
            <CheckIcon size={14} />
          </div>
        ) : null }
      </div>
      {label}
    </div>
  );
};
