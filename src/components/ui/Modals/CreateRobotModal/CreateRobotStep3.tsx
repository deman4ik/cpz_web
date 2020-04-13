import React, { memo } from 'react';

import { Button } from '../../../basic';
import { AlertIcon } from '../../../../assets/icons/svg';
import { color } from '../../../../config/constants';
import styles from '../index.module.css';

interface Props {
  robotName: string;
  handleOnStart?: () => void;
  onClose?: () => void;
}

const _CreateRobotStep3: React.FC<Props> = ({ robotName, handleOnStart, onClose }) => (
  <>
    <div className={styles.step3}>
      <div className={styles.iconWrapper}>
        <AlertIcon size={48} color={color.white} />
      </div>
      <div className={styles.bodyTitle}>
        Are you sure you want to start {robotName} robot now?
      </div>
      <div className={styles.bodyText}>
        It is a realtime automated trading mode using your exchange account and you use it at your own risk!
      </div>
    </div>
    <div className={styles.btns}>
      <Button
        className={styles.btn}
        title='Yes'
        icon='check'
        type='success'
        isUppercase
        onClick={handleOnStart} />
      <Button
        className={styles.btn}
        title='No'
        icon='close'
        type='primary'
        isUppercase
        onClick={onClose} />
    </div>
  </>
);

export const CreateRobotStep3 = memo(_CreateRobotStep3);
