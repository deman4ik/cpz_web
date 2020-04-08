import React from 'react';

import { useFetchRobots } from '../../../hooks/useFetchRobots';
import { useVisibleModal } from '../../../hooks/useVisibleModal';
import { RobotsList } from '../../ui/RobotsList';
import { LoadingIndicator } from '../../common';
import { SubscribeModal, UnsubscribeModal } from '../../ui/Modals';
import { Modal } from '../../basic';
import { formatRobotsData } from './helpers';
import { getIsVisibleStatus } from '../helpers';
import { modalType } from '../types';

interface Props {
  searchText?: string;
  displayType: string;
  width: number;
}

export const SignalsSearchContainer: React.FC<Props> = ({ searchText = '', width, displayType }) => {
  const { titleModal, setTitleModal, dataModal, handleSetVisible } = useVisibleModal();
  const { robotsData, counts, loading, loading_aggregate, isLoadingMore, onFetchMore } =
    useFetchRobots(displayType, searchText, formatRobotsData);

  return (
    <>
      { loading || loading_aggregate ? <LoadingIndicator />
        : (
          <RobotsList
            data={robotsData}
            isLoadingMore={isLoadingMore}
            onFetchMore={onFetchMore}
            counts={counts}
            width={width}
            displayType={displayType}
        />
        )}
      <Modal
        title={titleModal}
        isOpen={getIsVisibleStatus(modalType.unsubscribe, dataModal)}
        onClose={handleSetVisible}
      >
        <UnsubscribeModal
          setTitle={setTitleModal}
          onClose={handleSetVisible} />
      </Modal>
      <Modal
        isOpen={getIsVisibleStatus(modalType.subscribe, dataModal)}
        onClose={handleSetVisible}
        title={titleModal}
      >
        <SubscribeModal
          onClose={handleSetVisible}
          type={dataModal.ModalVisible.type}
          searchName={searchText}
          setTitle={setTitleModal} />
      </Modal>
    </>
  );
};
