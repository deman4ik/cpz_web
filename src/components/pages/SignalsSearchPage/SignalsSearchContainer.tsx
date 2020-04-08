import React, { useState } from 'react';

import { useFetchRobots } from '../../../hooks/useFetchRobots';
import { useVisibleModal } from '../../../hooks/useVisibleModal';
import { RobotsList } from '../../ui/RobotsList';
import { LoadingIndicator } from '../../common';
import { UnsubscribeModal } from '../../ui/Modals';
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
        onClose={handleSetVisible}>
        <UnsubscribeModal
          setTitle={setTitleModal}
          onClose={handleSetVisible} />
      </Modal>
      {/* <Modal
        screenType={dimension.screenType}
        visible={getIsVisibleStatus(modalType.subscribe, dataModal)}
        onDismiss={handleSetVisible}
        title={titleModal}
      >
        <SubscribeModal
          onDismiss={handleSetVisible}
          type={dataModal.ModalVisible.type}
          searchName={searchText}
          setTitle={setTitleModal} />
      </Modal>
      <Modal
        screenType={dimension.screenType}
        visible={getIsVisibleStatus(modalType.unsubscribe, dataModal)}
        onDismiss={handleSetVisible}
        title={titleModal}
      >
        <UnsubscribeModal
          setTitle={setTitleModal}
          onDismiss={handleSetVisible} />
      </Modal> */}
    </>
  );
};
