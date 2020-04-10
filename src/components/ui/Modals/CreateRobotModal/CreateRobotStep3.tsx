import React, { PropsWithChildren, memo } from 'react';
import { View, Text } from 'react-native';
import { IconButton } from 'react-native-paper';
import { WithTranslation, withTranslation } from 'react-i18next';

import { Button } from '../../basic';
import { vars } from '../../../styles';
import { styles as _styles } from './index.style';
import { styles } from '../../basic/Modal/index.style';

interface Props extends PropsWithChildren<WithTranslation> {
  robotName: string;
  handleOnStart?: () => void;
  onDismiss?: () => void;
}

const _CreateRobotStep3: React.FC<Props> = ({
  t,
  robotName,
  handleOnStart,
  onDismiss
}) => (
  <>
    <Text style={{
      maxWidth: 400,
      marginHorizontal: 'auto',
      marginTop: -30,
      marginBottom: 30,
      textAlign: 'center'
    }}>
      <IconButton icon='alert' size={48} color={vars.color.white} />
      {'\n'}
      <Text style={styles.bodyTitle}>
        Are you sure you want to start {robotName} robot now?
      </Text>
      {'\n'}{'\n'}
      <Text style={styles.bodyText}>
        It is a realtime automated trading mode using your exchange account and you use it at your own risk!
      </Text>
    </Text>
    <View style={_styles.btns}>
      <Button
        style={styles.btn}
        title={t('Yes')}
        icon='check'
        type='success'
        isUppercase
        onPress={handleOnStart}
      />
      <Button
        style={styles.btn}
        title={t('No')}
        icon='close'
        type='primary'
        isUppercase
        onPress={onDismiss}
      />
    </View>
  </>
);

export const CreateRobotStep3 = memo(withTranslation()(_CreateRobotStep3));
