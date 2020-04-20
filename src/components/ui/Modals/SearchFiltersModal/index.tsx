import React, { useMemo, memo } from 'react';
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
  const { data, loading } = useQuery(SEARCH_SIGNALS_FILTERS);

  const filterData = useMemo(() => (
    (!loading && data) ? getFilterData(data.filters) : { asset: [], exchange: [], timeframe: [] }
  ), [ data, loading ]);
  const handleOnPressItem = (item: string) => {
    console.log(item);
  };

  console.log(filterData);
  return (
    loading ? <LoadingIndicator /> : (
      <div>
        {labels.map((label: string) => (
          <div key={label} className={styles.row}>
            <div className={styles.label}>
              <div className={styles.labelText}>{`${capitalize(label)}:`}</div>
            </div>
            <div className={styles.btnContainer}>
              {filterData[label].map(item => (
                <Button
                  key={item.key}
                  type='rounded-primary'
                  title={item.label}
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
