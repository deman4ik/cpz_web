/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo, memo } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { ROBOT } from '../../../graphql/local/queries';
import { GET_MARKETS } from '../../../graphql/common/queries';
import { EDIT_ROBOT } from '../../../graphql/local/mutations';
import { USER_ROBOT_EDIT } from '../../../graphql/robots/mutations';
import { ErrorLine, LoadingIndicator } from '../../common';
import { Button, Input } from '../../basic';
import { moneyFormat } from '../../../config/utils';
import { color } from '../../../config/constants';
import styles from './index.module.css';

interface Props {
  onClose: () => void;
  setTitle: (title: string) => void;
  searchName?: string;
  code?: string;
}

const _EditRobotModal: React.FC<Props> = ({ onClose, searchName, code, setTitle }) => {
  const [ formError, setFormError ] = useState('');
  const { data: dataRobot } = useQuery(ROBOT);
  const [ inputVolume, setInputVolume ] = useState('0');

  useEffect(() => {
    if (dataRobot) {
      console.log(dataRobot.robot.subs.volume);
      setInputVolume(dataRobot.robot.subs.volume);
      setTitle(`Edit ${dataRobot ? dataRobot.robot.name : ''}`);
    }
  }, [ dataRobot ]);

  const { data, loading } = useQuery(GET_MARKETS, {
    variables: {
      exchange: dataRobot.robot.subs.exchange,
      asset: dataRobot.robot.subs.asset,
      currency: dataRobot.robot.subs.currency
    },
    skip: !dataRobot
  });
  const handleOnChange = (value: string) => {
    setInputVolume(value);
  };
  const [ userRobotEdit, { loading: editRobotLoading } ] = useMutation(USER_ROBOT_EDIT);
  const [ editRobot ] = useMutation(EDIT_ROBOT);

  const exchange = useMemo(() => ((!loading && data && data.markets.length) ?
    data.markets[0] : { limits: { amount: { min: 0, max: 0 } } }
  ), [ loading, data ]);

  const { min, max } = exchange.limits.amount;
  const isValid = () => (Number(inputVolume) >= min && Number(inputVolume) <= max);

  const handleOnSubmit = () => {
    userRobotEdit({
      variables: {
        id: dataRobot.robot.userRobotId,
        volume: Number(inputVolume),
      }
    }).then(response => {
      if (response.data.userRobotEdit.success) {
        editRobot({
          variables: {
            robot: dataRobot.robot,
            volume: Number(inputVolume),
            name: searchName,
            code
          }
        });
      } else {
        setFormError(response.data.userRobotEdit.error);
      }
      onClose();
    });
  };

  const handleOnKeyPress = (e) => {
    if (e.nativeEvent.key === 'Enter' && isValid()) {
      handleOnSubmit();
    }
  };

  return (
    <>
      {loading || editRobotLoading ? (<LoadingIndicator />) : (
        <>
          {formError && (
            <ErrorLine formError={formError} />
          )}
          <div className={styles.container}>
            <div className={styles.bodyTitle}>
              Please enter desired trading volume in&nbsp;
              <span style={{ color: color.white }}>{dataRobot ? dataRobot.robot.subs.asset : ''}</span>
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
                  error={!isValid()}
                  type='number'
                  width={160}
                  value={inputVolume}
                  selectTextOnFocus
                  onChangeText={value => handleOnChange(value)}
                  onKeyPress={handleOnKeyPress} />
                <div className={styles.btns}>
                  <Button
                    className={styles.btn}
                    title='Save'
                    icon='check'
                    type='success'
                    disabled={!isValid()}
                    isUppercase
                    onClick={handleOnSubmit} />
                  <Button
                    className={styles.btn}
                    title='Cancel'
                    icon='close'
                    type='dimmed'
                    isUppercase
                    onClick={onClose} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export const EditRobotModal = memo(_EditRobotModal);
