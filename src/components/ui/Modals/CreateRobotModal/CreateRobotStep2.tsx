import React, { memo } from 'react';

import { Button, Input } from '../../../basic';
import styles from '../index.module.css';
import { moneyFormat } from '../../../../config/utils';
import { calculateCurrency, calculateAsset } from '../helpers';

interface Props {
  asset: string;
  limits: { asset: { min: number; max: number }; price: number };
  volumeAsset: string;
  volumeCurrency: string;
  handleOnCreate: () => void;
  handleOnBack: () => void;
  setInputVolumeAsset: (value: string) => void;
  setInputVolumeCurrency: (value: string) => void;
}

const _CreateRobotStep2: React.FC<Props> =
({ asset, limits, volumeAsset, volumeCurrency, handleOnCreate, handleOnBack, setInputVolumeAsset, setInputVolumeCurrency }) => {
  const isValid = () => (Number(volumeAsset) >= limits.asset.min && Number(volumeAsset) <= limits.asset.max);

  const handleOnKeyPress = (e) => {
    if (e.nativeEvent.key === 'Enter' && isValid()) {
      handleOnCreate();
    }
  };

  const handleOnChangeAsset = (value: string) => {
    setInputVolumeAsset(value);
    setInputVolumeCurrency(calculateCurrency(value, limits.price));
  };

  const handleOnChangeCurrency = (value: string) => {
    setInputVolumeCurrency(value);
    setInputVolumeAsset(calculateAsset(value, limits.price));
  };

  return (
    <div className={styles.container}>
      <div className={styles.bodyTitle}>
        Please enter desired trading volume
      </div>
      <div className={styles.form}>
        <div className={[ styles.bodyText, styles.formComment ].join(' ')}>
          <div className={styles.value_group}>
            <div className={styles.label}>
              Minimum value is&nbsp;
            </div>
            <div className={styles.value_row}>
              <span>{moneyFormat(limits.asset.min, 3)}</span>&nbsp;
              <span style={{ color: 'white' }}>{asset}</span>
              &nbsp;≈&nbsp;{calculateCurrency(limits.asset.min.toString(), limits.price)}&nbsp;$
            </div>
          </div>
        </div>
        <div className={styles.fieldset}>
          <div className={styles.input_group}>
            <div className={styles.volume}>
              <Input
                error={!isValid()}
                width={150}
                type='number'
                value={`${volumeAsset}`}
                selectTextOnFocus
                right
                onChangeText={value => handleOnChangeAsset(value)}
                onKeyPress={handleOnKeyPress} />
              <span className={styles.volume_text}>{asset}</span>
            </div>
            <span className={styles.delimiter} style={{ marginTop: 3 }}>≈</span>
            <div className={styles.volume} style={{ marginTop: 3 }}>
              <Input
                type='number'
                value={`${volumeCurrency}`}
                width={150}
                right
                onKeyPress={handleOnKeyPress}
                onChangeText={value => handleOnChangeCurrency(value)} />
              <span className={styles.volume_text}>$</span>
            </div>
          </div>
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
          disabled={!isValid()}
          isUppercase
          onClick={handleOnCreate} />
      </div>
    </div>
  );
};

export const CreateRobotStep2 = memo(_CreateRobotStep2);
