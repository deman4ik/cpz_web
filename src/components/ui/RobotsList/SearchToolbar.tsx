/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';

import { SET_SEARCH_FILTERS } from '../../../graphql/local/mutations';
import { SEARCH_FILTERS } from '../../../graphql/local/queries';
import { SearchInput, CaptionButton } from '../../basic';
import styles from './SearchToolbar.module.css';

interface Props {
  setSignalsSearchValue: (text: string) => void;
  setVisibleToolbarFilters?: () => void;
  displayType: string;
}

export const SearchToolbar: React.FC<Props> = ({ displayType, setVisibleToolbarFilters }) => {
  const [ value, setValue ] = useState('');
  const [ setFilter ] = useMutation(SET_SEARCH_FILTERS, { refetchQueries: [ { query: SEARCH_FILTERS } ] });
  const { data } = useQuery(SEARCH_FILTERS);

  const onSignalsSearch = text => {
    const filters = (data && data.Filters[displayType]) ? JSON.parse(data.Filters[displayType]) : {};
    setFilter({
      variables: { searchFilters: JSON.stringify({ ...filters, name: { _ilike: text ? `%${text}%` : null } }), type: displayType }
    });
    setValue(text);
  };

  const handleOnPressClearFilter = () => {
    const filters = (data && data.Filters[displayType]) ? JSON.parse(data.Filters[displayType]) : {};
    const searchFilters = filters.name && filters.name._ilike ? JSON.stringify({ name: filters.name }) : '';
    console.log(searchFilters);
    setFilter({
      variables: { searchFilters, type: displayType }
    });
  };

  useEffect(() => {
    const filters = (data && data.Filters[displayType]) ? JSON.parse(data.Filters[displayType]) : {};
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
