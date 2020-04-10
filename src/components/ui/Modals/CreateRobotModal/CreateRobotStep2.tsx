import React, { PropsWithChildren, memo } from 'react';
import { View, Text, TextInput } from 'react-native';
import { WithTranslation, withTranslation } from 'react-i18next';

import { Button } from '../../basic';
import { styles as _styles, responsive } from './index.style';
import { styles } from '../../basic/Modal/index.style';
import { color } from '../../../styles/vars';
import { moneyFormat } from '../../../services/Utils';

interface Props extends PropsWithChildren<WithTranslation> {
  asset: string;
  min: number;
  max: number;
  volume: string;
  handleOnCreate: () => void;
  handleOnBack: () => void;
  setVolume: (value: string) => void;
}

const _CreateRobotStep2: React.FC<Props> = ({
  t,
  asset,
  min,
  max,
  volume,
  handleOnCreate,
  handleOnBack,
  setVolume
}) => {
  const isValidNumber = Number(volume) >= min && Number(volume) <= max;

  const handleOnChange = (value: string) => {
    setVolume(value);
  };

  const handleOnKeyPress = (e) => {
    if (e.nativeEvent.key === 'Enter' && isValidNumber) {
      handleOnCreate();
    }
  };

  return (
    <>
      <Text style={styles.bodyTitle}>
        {t('Please enter desired trading volume in')}&nbsp;
        <Text style={{ color: color.white }}>{asset || ''}</Text>
      </Text>
      <View style={_styles.form}>
        <Text style={[ styles.bodyText, _styles.formComment ]}>
          <Text style={_styles.label}>
            {t('Minimum value is')}
          </Text>
          &nbsp;{moneyFormat(min, 3)}
        </Text>
        <View style={_styles.fieldset}>
          <TextInput
            style={responsive.input(!isValidNumber)}
            keyboardType='numeric'
            value={`${volume}`}
            selectTextOnFocus
            onChangeText={value => handleOnChange(value)}
            onKeyPress={handleOnKeyPress}
          />
        </View>
      </View>
      <View style={_styles.btns}>
        <Button
          style={styles.btn}
          title={t('Back')}
          icon='chevron-left'
          type='dimmed'
          isUppercase
          onPress={handleOnBack}
        />
        <Button
          style={styles.btn}
          title={t('Next')}
          icon='chevron-right'
          type='success'
          disabled={!isValidNumber}
          isUppercase
          onPress={handleOnCreate}
        />
      </View>
    </>
  );
};

export const CreateRobotStep2 = memo(withTranslation()(_CreateRobotStep2));
