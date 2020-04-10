import React, { memo } from 'react';

import { Button, Input } from '../../../basic';
import styles from '../index.module.css';
import { color } from '../../../../config/constants';
import { moneyFormat } from '../../../../config/utils';

interface Props {
  asset: string;
  min: number;
  max: number;
  volume: string;
  handleOnCreate: () => void;
  handleOnBack: () => void;
  setVolume: (value: string) => void;
}

const _CreateRobotStep2: React.FC<Props> = ({
  asset,
  min,
  max,
  volume,
  handleOnCreate,
  handleOnBack,
  setVolume
}) => {
  const isValidNumber = () => (Number(volume) >= min && Number(volume) <= max);

  const handleOnChange = (value: string) => {
    setVolume(value);
  };

  const handleOnKeyPress = (e) => {
    if (e.nativeEvent.key === 'Enter' && isValidNumber()) {
      handleOnCreate();
    }
  };

  return (
    <>
      <div className={styles.bodyTitle}>
        Please enter desired trading volume in&nbsp;
        <span style={{ color: color.white }}>{asset || ''}</span>
      </div>
      <div className={styles.form}>
        <div className={[ styles.bodyText, styles.formComment ].join(' ')}>
          <div className={styles.label}>
            Minimum value is&nbsp;
          </div>
          {moneyFormat(min, 3)}
        </div>
        <div className={styles.fieldset}>
          <Input
            error={!isValidNumber()}
            type='number'
            value={volume}
            selectTextOnFocus
            onChangeText={value => handleOnChange(value)}
            onKeyPress={handleOnKeyPress} />
        </div>
      </div>
      <div className={styles.btns}>
        <Button
          className={styles.btn}
          title='Back'
          icon='chevronleft'
          type='dimmed'
          isUppercase
          onClick={handleOnBack} />
        <Button
          className={styles.btn}
          title='Next'
          icon='chevronright'
          type='success'
          disabled={!isValidNumber()}
          isUppercase
          onClick={handleOnCreate} />
      </div>
    </>
  );
};

export const CreateRobotStep2 = memo(_CreateRobotStep2);
