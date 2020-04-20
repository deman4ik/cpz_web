/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo, useState, memo, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { SEARCH_SIGNALS_FILTERS } from '../../../../graphql/signals/queries';
import { SEARCH_FILTERS } from '../../../../graphql/local/queries';
import { SET_SEARCH_FILTERS } from '../../../../graphql/local/mutations';
import { LoadingIndicator } from '../../../common';
import { Button } from '../../../basic';
import { capitalize } from '../../../../config/utils';
import { labels, getFilterData, getElements } from './helpers';
import { CheckedFilter } from './types';
import styles from './index.module.css';

interface Props {
  onClose: () => void;
  displayType: string;
}

const _SearchFiltersModal: React.FC<Props> = ({ onClose, displayType }) => {
  const [ checkedButtons, setCheckedButtons ] = useState<CheckedFilter>({ asset: [], exchange: [], timeframe: [] });
  const { data, loading } = useQuery(SEARCH_SIGNALS_FILTERS);
  const [ setFilters ] = useMutation(SET_SEARCH_FILTERS, { refetchQueries: [ { query: SEARCH_FILTERS } ] });

  const filterData = useMemo(() => (
    (!loading && data)
      ? getFilterData(data.filters)
      : { asset: [], exchange: [], timeframe: [] }
  ), [ data, loading ]);

  useEffect(() => {
    if (data && data.Filters[displayType]) {
      const filters = JSON.parse(data.Filters[displayType]);
      const obj = (Object.keys(filters).filter(el => el !== 'name').reduce((acc, item) => (
        { ...acc,
          [item]: filters[item]._in
            ? filterData[item].filter(el => !filters[item]._in.includes(el.key)).map(el => el.key)
            : [] }
      ), {}));
      setCheckedButtons(prev => ({ ...prev, ...obj }));
    }
  }, [ filterData, data ]);

  const handleOnPressItem = (item: string, label: string) => {
    setCheckedButtons(prev => ({ ...prev,
      [label]: prev[label].find(el => el === item)
        ? prev[label].filter(el => el !== item)
        : [ ...prev[label], item ]
    }));
  };

  const confirmSelectedFilter = () => {
    const filters = data.Filters[displayType] ? JSON.parse(data.Filters[displayType]) : {};
    const searchFilters = Object.keys(filterData).reduce((acc, item) => ({
      ...acc, [item]: { _in: getElements(filterData[item], checkedButtons[item]) }
    }), {});

    setFilters({ variables: {
      searchFilters: JSON.stringify({ ...searchFilters, ...filters.name ? { name: filters.name } : {} }),
      type: displayType
    } }).then(_result => {
      onClose();
    });
  };

  const clearFilters = () => {
    setCheckedButtons({ asset: [], exchange: [], timeframe: [] });
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
                  type={checkedButtons[label].includes(item.key) ? 'rounded' : 'rounded-primary'}
                  title={item.label}
                  style={{ marginLeft: 5, marginTop: 5 }}
                  clickable={false}
                  onClick={() => handleOnPressItem(item.key, label)} />
              ))}
            </div>
          </div>
        ))}
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
            title='clear filter'
            style={{ marginLeft: 15 }}
            onClick={clearFilters}
            icon='close'
            isUppercase />
        </div>
      </div>
    )
  );
};

export const SearchFiltersModal = memo(_SearchFiltersModal);
