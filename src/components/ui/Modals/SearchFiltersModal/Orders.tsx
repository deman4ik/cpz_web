import React, { useState, memo } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { GET_SEARCH_PROPS } from '../../../../graphql/local/queries';
import { SET_SEARCH_PROPS } from '../../../../graphql/local/mutations';
import { Button } from '../../../basic';
import { ordersSort } from './helpers';
import styles from './Filters.module.css';

interface Props {
  onClose: () => void;
  displayType: string;
}

const _Orders: React.FC<Props> = ({ onClose, displayType }) => {
  const [ checkedButtons, setCheckedButtons ] = useState<string[]>([]);
  const clearFilters = () => {
    setCheckedButtons([]);
  };

  const confirmSelectedFilter = () => {

  };

  const handleOnPressItem = (item: string) => {
    setCheckedButtons(prev => (
      prev.find(el => el === item) ? prev.filter(el => el !== item) : [ ...prev, item ]));
  };

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.btnContainer}>
          {Object.keys(ordersSort).map(key => (
            <Button
              key={key}
              type={checkedButtons.includes(key) ? 'rounded-primary' : 'rounded'}
              title={ordersSort[key]}
              style={{ marginLeft: 5, marginTop: 5 }}
              clickable={false}
              onClick={() => handleOnPressItem(key)} />
          ))}
        </div>
      </div>
      <div className={styles.btnsGroup}>
        <Button
          title='OK'
          icon='check'
          type='success'
          onClick={confirmSelectedFilter}
          isUppercase />
        <Button
          type='dimmed'
          width={160}
          title='clear sorted'
          style={{ marginLeft: 15 }}
          onClick={clearFilters}
          icon='close'
          isUppercase />
      </div>
    </div>
  );
};

export const Orders = memo(_Orders);
