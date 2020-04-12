import React, { useState } from 'react';

import { CheckIcon } from '../../../assets/icons/svg';
import { LoadingIndicator } from '../../common';
import { color } from '../../../config/constants';
import styles from './index.module.css';

interface Props {
  checked: boolean;
  label?: string;
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
}

export const CheckBox: React.FC<Props> = ({ checked, label, disabled, onClick, isLoading }) => {
  const [ isChecked, setIsChecked ] = useState(checked);
  const getCheckboxStyle = () => {
    const style = [ styles.checkbox, disabled ? styles.disabled : isChecked ? styles.checked : styles.unchecked ];
    return style;
  };

  const handleOnClick = () => {
    if (!disabled) {
      onClick();
      setIsChecked(!isChecked);
    }
  };

  const getTextColor = () => [ styles.checkBoxWrapper, disabled ? styles.textColorDisabled : styles.textColor ];

  return (
    <div className={getTextColor().join(' ')} onClick={handleOnClick}>
      {isLoading && (
      <div className={styles.loadingContainer}>
        <LoadingIndicator size={10} />
      </div>
      )}
      <div className={getCheckboxStyle().join(' ')} style={{ opacity: isLoading ? 0 : 1 }}>
        { isChecked ? (
          <div className={styles.checkedIcon}>
            <CheckIcon size={18} color={color.primary} />
          </div>
        ) : null }
      </div>
      {label}
    </div>
  );
};
