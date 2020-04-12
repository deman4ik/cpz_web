import React from 'react';

import { useFetchRobots } from '../../../hooks/useFetchRobots';
import { RobotsList } from '../../ui/RobotsList';
import { LoadingIndicator } from '../../common';
import { formatRobotsData } from './helpers';
import { Modals } from './Modals';

interface Props {
  searchText?: string;
  displayType: string;
  width: number;
}

export const SignalsSearchContainer: React.FC<Props> = ({ searchText = '', width, displayType }) => {
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
      <Modals searchText={searchText} />
    </>
  );
};
