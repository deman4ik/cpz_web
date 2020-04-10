import React, { useState } from 'react';
import Router from 'next/router';

import useWindowDimensions from '../../../hooks/useWindowDimensions';
import { useDebounce } from '../../../hooks/useDebounce';
import { Template } from '../../layout';
import { RobotsSearchContainer } from './RobotsSearchContainer';
import { SearchToolbar } from '../../ui/RobotsList/SearchToolbar';
import { PageType } from '../../../config/types';
import styles from './index.module.css';

export const RobotsSearchPage: React.FC = () => {
  const [ signalsSearchValue, setSignalsSearchValue ] = useState('');
  const debouncedSearchTerm = useDebounce(signalsSearchValue, 500);
  const { width } = useWindowDimensions();

  const handlePressBack = () => {
    Router.back();
  };

  return (
    <Template
      page={PageType.robots}
      title='Robots Search'
      width={width}
      toolbar={(
        <SearchToolbar
          setSignalsSearchValue={setSignalsSearchValue}
          displayType='robots' />
      )}
      handlePressBack={handlePressBack}
    >
      <div className={styles.container}>
        <RobotsSearchContainer
          displayType='robots'
          searchText={debouncedSearchTerm}
          width={width} />
      </div>
    </Template>
  );
};
