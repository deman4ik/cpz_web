import React, { useMemo, useState, memo } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { SEARCH_SIGNALS_FILTERS } from '../../../../graphql/signals/queries';
import { LoadingIndicator } from '../../../common';
import { Button } from '../../../basic';
import { capitalize } from '../../../../config/utils';
import { labels, getFilterData } from './helpers';
import styles from './index.module.css';

interface Props {

}

const _SearchFiltersModal: React.FC<Props> = () => {
  const [ checkedButtons, setCheckedButtons ] = useState<string[]>([]);
  const { data, loading } = useQuery(SEARCH_SIGNALS_FILTERS);

  const filterData = useMemo(() => (
    (!loading && data) ? getFilterData(data.filters) : { asset: [], exchange: [], timeframe: [] }
  ), [ data, loading ]);
  const handleOnPressItem = (item: string) => {
    setCheckedButtons(prev => (
      prev.find(el => el === item) ? prev.filter(el => el !== item) : [ ...prev, item ]
    ));
  };

  return (
    loading ? <LoadingIndicator /> : (
      <div className={styles.container}>
        {labels.map((label: string) => (
          <div key={label} className={styles.row}>
            <div className={styles.label}>
              <div className={styles.labelText}>{`${capitalize(label)}:`}</div>
            </div>
            <div className={styles.btnContainer}>
              {filterData[label].map(item => (
                <Button
                  key={item.key}
                  type={checkedButtons.includes(item.key) ? 'rounded' : 'rounded-primary'}
                  title={item.label}
                  style={{ marginLeft: 5, marginTop: 5 }}
                  clickable={false}
                  onClick={() => handleOnPressItem(item.key)} />
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  );
};

export const SearchFiltersModal = memo(_SearchFiltersModal);
