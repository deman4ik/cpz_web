import React from 'react';

import { useFetchRobots } from '../../../hooks/useFetchRobots';
import { RobotsList } from '../../ui/RobotsList';
import { LoadingIndicator } from '../../common';
import { formatRobotsData } from './helpers';
import { Modals } from './Modals';

interface Props {
  displayType: string;
  width: number;
}

export const SignalsSearchContainer: React.FC<Props> = ({ width, displayType }) => {
  const { robotsData, counts, loading, isLoadingMore, onFetchMore } =
    useFetchRobots(displayType, formatRobotsData);

  return (
    <>
      { loading ? <div className='loading'><LoadingIndicator /></div> : (
        <RobotsList
          data={robotsData}
          isLoadingMore={isLoadingMore}
          onFetchMore={onFetchMore}
          counts={counts}
          width={width}
          displayType={displayType} />
      )}
      <Modals />
    </>
  );
};
