import React, { useState } from 'react';

import { SearchInput, CaptionButton } from '../../basic';
import styles from './SearchToolbar.module.css';

interface Props {
  setSignalsSearchValue: (text: string) => void;
  setVisibleToolbarFilters?: () => void;
  displayType: string;
}

export const SearchToolbar: React.FC<Props> = ({ setSignalsSearchValue, displayType, setVisibleToolbarFilters }) => {
  const [ value, setValue ] = useState('');

  const onSignalsSearch = text => {
    setSignalsSearchValue(text);
    setValue(text);
  };

  const handleOnPress = () => {
    setVisibleToolbarFilters();
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
        onClick={handleOnPress} />
    </div>
  );
};
