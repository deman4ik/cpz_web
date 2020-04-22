/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';

import { useDebounce } from '../../../hooks/useDebounce';
import { SET_SEARCH_PROPS } from '../../../graphql/local/mutations';
import { GET_SEARCH_PROPS } from '../../../graphql/local/queries';
import { SearchInput, CaptionButton } from '../../basic';
import { getSearchProps } from '../../../config/utils';
import styles from './SearchToolbar.module.css';

interface Props {
  setVisibleToolbarFilters?: () => void;
  displayType: string;
}

const defaultOrderBy = {
  recovery_factor: 'desc_nulls_last', id: 'asc'
};

export const SearchToolbar: React.FC<Props> = ({ displayType, setVisibleToolbarFilters }) => {
  const [ value, setValue ] = useState('');
  const debounceValue = useDebounce(value, 500);
  const [ setFilter ] = useMutation(SET_SEARCH_PROPS, { refetchQueries: [ { query: GET_SEARCH_PROPS } ] });
  const { data } = useQuery(GET_SEARCH_PROPS);

  const onSignalsSearch = text => {
    setValue(text);
  };

  const handleOnPressClearFilter = () => {
    const search = getSearchProps(data, displayType);
    const filters = (search && search.filters) ? JSON.parse(search.filters) : {};
    const searchFilters = filters.name && filters.name._ilike ? JSON.stringify({ name: filters.name }) : '';

    setFilter({
      variables: {
        filters: searchFilters,
        orders: JSON.stringify(defaultOrderBy),
        type: displayType
      }
    });
  };

  useEffect(() => {
    const search = getSearchProps(data, displayType);
    const filters = (search && search.filters) ? JSON.parse(search.filters) : {};
    if (filters.name && filters.name._ilike) {
      setValue((filters.name._ilike).slice(1, -1));
    }
  }, []);

  useEffect(() => {
    const search = getSearchProps(data, displayType);
    const filters = (search && search.filters) ? JSON.parse(search.filters) : {};
    setFilter({
      variables: {
        filters: JSON.stringify({ ...filters, name: { _ilike: debounceValue ? `%${debounceValue}%` : null } }),
        orders: (search && search.orders) ? search.orders : '',
        type: displayType
      }
    });
  }, [ debounceValue ]);

  return (
    <div className={styles.container}>
      <SearchInput
        value={value}
        onChange={onSignalsSearch}
        placeholder={`Search ${displayType}...`} />
      <CaptionButton
        title='filter'
        icon='filtervariant'
        responsive
        onClick={setVisibleToolbarFilters} />
      <CaptionButton
        title='remove'
        icon='filtervariantremove'
        responsive
        onClick={handleOnPressClearFilter} />
    </div>
  );
};
