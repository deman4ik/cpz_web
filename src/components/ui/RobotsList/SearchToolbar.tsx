/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';

import { SET_SEARCH_PROPS } from '../../../graphql/local/mutations';
import { GET_SEARCH_PROPS } from '../../../graphql/local/queries';
import { SearchInput, CaptionButton } from '../../basic';
import { getSearchProps } from '../../../config/utils';
import styles from './SearchToolbar.module.css';

interface Props {
  //setSignalsSearchValue: (text: string) => void;
  setVisibleToolbarFilters?: () => void;
  displayType: string;
}

export const SearchToolbar: React.FC<Props> = ({ displayType, setVisibleToolbarFilters }) => {
  const [ value, setValue ] = useState('');
  const [ setFilter ] = useMutation(SET_SEARCH_PROPS, { refetchQueries: [ { query: GET_SEARCH_PROPS } ] });
  const { data } = useQuery(GET_SEARCH_PROPS);

  const onSignalsSearch = text => {
    const search = getSearchProps(data, displayType);
    const filters = (search && search.filters) ? JSON.parse(search.filters) : {};
    setFilter({
      variables: {
        value: JSON.stringify({ ...filters, name: { _ilike: text ? `%${text}%` : null } }),
        field: 'filters',
        type: displayType
      }
    });
    setValue(text);
  };

  const handleOnPressClearFilter = () => {
    const search = getSearchProps(data, displayType);
    const filters = (search && search.filters) ? JSON.parse(search.filters) : {};
    const searchFilters = filters.name && filters.name._ilike ? JSON.stringify({ name: filters.name }) : '';

    setFilter({
      variables: {
        value: searchFilters,
        field: 'filters',
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
