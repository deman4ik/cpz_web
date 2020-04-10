import React from 'react';

import { useFetchRobots } from '../../../hooks/useFetchRobots';
import { RobotsList } from '../../ui/RobotsList';
import { LoadingIndicator } from '../../common';
import { Modals } from './Modals';
import { formatRobotsData } from './helpers';

interface Props {
  searchText?: string;
  displayType: string;
  width: number;
}

export const RobotsSearchContainer: React.FC<Props> = ({ displayType, searchText = '', width }) => {
  const { robotsData, counts, loading, loading_aggregate, isLoadingMore, onFetchMore } =
    useFetchRobots(displayType, searchText, formatRobotsData);

  return (
    <>
      { loading || loading_aggregate ? <LoadingIndicator /> : (
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
