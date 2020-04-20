import React, { useState } from 'react';
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

export const SearchToolbar: React.FC<Props> = ({ setSignalsSearchValue, displayType, setVisibleToolbarFilters }) => {
  const [ value, setValue ] = useState('');
  const [ setFilter ] = useMutation(SET_SEARCH_FILTERS, { refetchQueries: [ { query: SEARCH_FILTERS } ] });
  const { data } = useQuery(SEARCH_FILTERS);

  const onSignalsSearch = text => {
    const filters = (data && data.searchFilters) ? JSON.parse(data.searchFilters) : {};
    setFilter({
      variables: { searchFilters: JSON.stringify({ ...filters, name: { _ilike: text ? `%${text}%` : null } }) }
    });
    //setSignalsSearchValue(text);
    setValue(text);
  };

  const handleOnPressClearFilter = () => {
    setFilter({
      variables: { searchFilters: '' }
    });
  };

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
