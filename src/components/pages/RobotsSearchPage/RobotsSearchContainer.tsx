import React from 'react';

import { useFetchRobots } from '../../../hooks/useFetchRobots';
import { RobotsList } from '../../ui/RobotsList';
import { LoadingIndicator } from '../../common';
import { Modals } from './Modals';
import { formatRobotsData } from './helpers';
import styles from '../../../config/common.module.css';

interface Props {
  searchText?: string;
  displayType: string;
  width: number;
}

export const RobotsSearchContainer: React.FC<Props> = ({ displayType, searchText = '', width }) => {
  const { robotsData, counts, loading, isLoadingMore, onFetchMore } =
    useFetchRobots(displayType, searchText, formatRobotsData);

  return (
    <>
      { loading ? <div className={styles.loading}><LoadingIndicator /></div> : (
        <RobotsList
          data={robotsData}
          isLoadingMore={isLoadingMore}
          onFetchMore={onFetchMore}
          counts={counts}
          width={width}
          displayType={displayType} />
      )}
      <Modals searchText={searchText} width={width} />
    </>
  );
};
