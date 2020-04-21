import React, { useState } from 'react';
import Router from 'next/router';

import useWindowDimensions from '../../../hooks/useWindowDimensions';
//import { useDebounce } from '../../../hooks/useDebounce';
import { Template } from '../../layout';
import { RobotsSearchContainer } from './RobotsSearchContainer';
import { SearchToolbar } from '../../ui/RobotsList/SearchToolbar';
import { Modal } from '../../basic';
import { PageType } from '../../../config/types';
import { SearchFiltersModal } from '../../ui/Modals';
import styles from './index.module.css';

export const RobotsSearchPage: React.FC = () => {
  //const [ signalsSearchValue, setSignalsSearchValue ] = useState('');
  //const debouncedSearchTerm = useDebounce(signalsSearchValue, 500);
  const [ isVisibleFilters, setIsVisibleFilters ] = useState(false);
  const { width } = useWindowDimensions();

  const handlePressBack = () => {
    Router.back();
  };

  const setVisibleToolbarFilters = () => {
    setIsVisibleFilters(prev => !prev);
  };

  return (
    <Template
      page={PageType.robots}
      title='Robots Search'
      width={width}
      toolbar={(
        <SearchToolbar
          setVisibleToolbarFilters={setVisibleToolbarFilters}
          displayType='robots' />
      )}
      hideToolbar
      handlePressBack={handlePressBack}
    >
      <div className={styles.container}>
        <RobotsSearchContainer
          displayType='robots'
          width={width} />
      </div>
      <Modal
        isOpen={isVisibleFilters}
        title='Filter Signals Search'
        onClose={setVisibleToolbarFilters}
      >
        <SearchFiltersModal onClose={setVisibleToolbarFilters} displayType='robots' />
      </Modal>
    </Template>
  );
};
