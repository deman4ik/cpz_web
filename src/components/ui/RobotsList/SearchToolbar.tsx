import React, { useState } from 'react';

import { SearchInput } from '../../basic';
import styles from './SearchToolbar.module.css';

interface Props {
  setSignalsSearchValue: (text: string) => void;
  displayType: string;
}

export const SearchToolbar: React.FC<Props> = ({ setSignalsSearchValue, displayType }) => {
  const [ value, setValue ] = useState('');

  const onSignalsSearch = text => {
    setSignalsSearchValue(text);
    setValue(text);
  };

  return (
    <div className={styles.container}>
      <SearchInput
        value={value}
        onChange={onSignalsSearch}
        placeholder={`Search ${displayType}...`} />
    </div>
  );
};
