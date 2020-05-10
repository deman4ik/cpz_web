import React, { useState } from 'react';
import Router from 'next/router';

import useWindowDimensions from '../../../hooks/useWindowDimensions';
//import { useDebounce } from '../../../hooks/useDebounce';
import { Template } from '../../layout';
import { SignalsSearchContainer } from './SignalsSearchContainer';
import { Modal } from '../../basic';
import { SearchToolbar } from '../../ui/RobotsList/SearchToolbar';
import { PageType } from '../../../config/types';
import { SearchFiltersModal } from '../../ui/Modals';
import styles from './index.module.css';

export const SignalsSearchPage: React.FC = () => {
  //const [ signalsSearchValue, setSignalsSearchValue ] = useState('');
  //const debouncedSearchTerm = useDebounce(signalsSearchValue, 500);
  const [ isVisibleFilters, setIsVisibleFilters ] = useState(false);
  const { width } = useWindowDimensions();

  const handlePressBack = () => {
    Router.back();
  };

  const setVisibleToolbarFilters = () => {
    setIsVisibleFilters((prev) => !prev);
  };

  return (
      <Template
          page={PageType.signals}
          title='Signals Search'
            width={width}
          toolbar={<SearchToolbar setVisibleToolbarFilters={setVisibleToolbarFilters} displayType='signals' />}
            hideToolbar
            handlePressBack={handlePressBack}>
          <div className={styles.container}>
              <SignalsSearchContainer displayType='signals' width={width} />
            </div>
          <Modal isOpen={isVisibleFilters} onClose={setVisibleToolbarFilters} title='Filter Signals Search'>
          <SearchFiltersModal onClose={setVisibleToolbarFilters} displayType='signals' />
            </Modal>
        </Template>
  );
};
