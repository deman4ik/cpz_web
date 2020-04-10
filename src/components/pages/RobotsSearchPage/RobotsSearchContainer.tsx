import React from 'react';

import { useFetchRobots } from '../../../hooks/useFetchRobots';
import { useVisibleModal } from '../../../hooks/useVisibleModal';
import { RobotsList } from '../../ui/RobotsList';
import { LoadingIndicator } from '../../common';
import { Modal } from '../../basic';
//import { ActionRobotModal, EditRobotModal, CreateRobotModal } from '../../ui/Modals';
import { formatRobotsData } from './helpers';
import { getIsVisibleStatus } from '../helpers';
import { modalType } from '../types';

interface Props {
  searchText?: string;
  displayType: string;
  width: number;
}

export const RobotsSearchContainer: React.FC<Props> = ({ displayType, searchText = '', width }) => {
  const { titleModal, setTitleModal, dataModal, handleSetVisible } = useVisibleModal();
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
      {/* <Modal
        screenType={screenType}
        visible={getIsVisibleStatus(modalType.create, dataModal)}
        onDismiss={handleSetVisible}
        title='Add Trading Robot'
      >
        <CreateRobotModal
          onDismiss={handleSetVisible}
          searchName={searchText}
          dimension={dimension}
        />
      </Modal>
      <Modal
        screenType={screenType}
        visible={getIsVisibleStatus(modalType.action, dataModal)}
        onDismiss={handleSetVisible}
        title={titleModal}
      >
        <ActionRobotModal
          setTitle={setTitleModal}
          onDismiss={handleSetVisible}
          type={dataModal.ModalVisible.type}
        />
      </Modal>
      <Modal
        screenType={screenType}
        visible={getIsVisibleStatus(modalType.edit, dataModal)}
        onDismiss={handleSetVisible}
        title={titleModal}
      >
        <EditRobotModal
          onDismiss={handleSetVisible}
          searchName={searchText}
          setTitle={setTitleModal} />
      </Modal> */}
    </>
  );
};
