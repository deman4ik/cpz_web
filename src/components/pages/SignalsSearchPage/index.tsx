import React, { useState } from 'react';
import Router from 'next/router';

//import { useDimensionWidth } from '../../../hooks/useDimensions';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import { useDebounce } from '../../../hooks/useDebounce';
import { Template } from '../../layout';
import { SignalsSearchContainer } from './SignalsSearchContainer';
//import { SearchToolbar } from '../../ui/RobotsList/SearchToolbar';
import { PageType } from '../../../config/types';
import styles from './index.module.css';

export const SignalsSearchPage: React.FC = () => {
  const [ signalsSearchValue, setSignalsSearchValue ] = useState('');
  const debouncedSearchTerm = useDebounce(signalsSearchValue, 500);
  const { width } = useWindowDimensions();
  const handlePressBack = () => {
    Router.back();
  };

  return (
    <Template
      page={PageType.signals}
      title='Signals Search'
      width={width}
      // toolbar={(
      //   <SearchToolbar
      //     setSignalsSearchValue={setSignalsSearchValue}
      //     screenType={dimension.screenType}
      //     displayType='signals'
      //     screenWidth={dimension.screenWidth} />
      // )}
      handlePressBack={handlePressBack}>
      <div className={styles.container}>
        <SignalsSearchContainer
          searchText={debouncedSearchTerm}
          displayType='signals'
          width={width} />
      </div>
    </Template>
  );
};
