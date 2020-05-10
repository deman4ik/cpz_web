import React, { useState } from 'react';
import Router from 'next/router';

import useWindowDimensions from '../../../hooks/useWindowDimensions';
import { Template } from '../../layout';
import { RobotsSearchContainer } from './RobotsSearchContainer';
import { SearchToolbar } from '../../ui/RobotsList/SearchToolbar';
import { Modal } from '../../basic';
import { PageType } from '../../../config/types';
import { SearchFiltersModal } from '../../ui/Modals';
import styles from './index.module.css';

export const RobotsSearchPage: React.FC = () => {
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
          page={PageType.robots}
          title='Robots Search'
          width={width}
          toolbar={<SearchToolbar setVisibleToolbarFilters={setVisibleToolbarFilters} displayType='robots' />}
          hideToolbar
            handlePressBack={handlePressBack}>
            <div className={styles.container}>
          <RobotsSearchContainer displayType='robots' width={width} />
        </div>
          <Modal isOpen={isVisibleFilters} title='Filter Robots Search' onClose={setVisibleToolbarFilters}>
          <SearchFiltersModal onClose={setVisibleToolbarFilters} displayType='robots' />
            </Modal>
        </Template>
  );
};
