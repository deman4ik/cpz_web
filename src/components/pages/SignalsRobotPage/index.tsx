import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from '@apollo/react-hooks';

import { Template } from '../../layout/Template';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import { PageType, TabType } from '../../../config/types';
import { GET_ROBOT_INFO } from '../../../graphql/robots/queries';
import { SET_ROBOT_DATA } from '../../../graphql/local/mutations';
import { POLL_INTERVAL } from '../../../config/constants';
import { HeaderRobotsRobotPage } from './HeaderRobotsRobotPage';
import { TabsHeaderRobotPage } from './HeaderRobotsRobotPage/TabsHeaderRobotPage';
import { TabsPagesRobotPage } from './TabsPagesRobotPage';
import { NoRecentData, LoadingIndicator } from '../../common';
import { ToolbarRobotPage } from './ToolbarRobotPage';
import { ModalsRobotPage } from './ModalsRobotPage';
import { formatRobotData } from './helpers';

export const SignalsRobotPage = () => {
  const { width } = useWindowDimensions();
  const [ activeTab, setActiveTab ] = useState<TabType>(TabType.trading);
  const [ visibleModal, setVisibleModal ] = useState({ isVisible: false, type: '' });

  const router = useRouter();
  const handlePressBack = () => {
    router.back();
  };

  const { data, loading } = useQuery(GET_ROBOT_INFO, {
    variables: {
      code: router.query.code
    },
    pollInterval: POLL_INTERVAL
  });

  const [ setRobotData ] = useMutation(SET_ROBOT_DATA, {
    onCompleted: (resolve) => {
      setVisibleModal({ isVisible: true, type: resolve.setRobot });
    }
  });

  const robotData = useMemo(() => (!loading && data && data.robot.length ? formatRobotData(data) : null), [
    data,
    loading
  ]);

  const robotSubscribe = (variables) => {
    setRobotData(variables);
  };

  return (
      <Template
          page={PageType.signals}
          title='Signals'
          subTitle={robotData ? robotData.robot.name : ''}
          width={width}
          toolbar={robotData ? <ToolbarRobotPage robotSubscribe={robotSubscribe} robotData={robotData} /> : null}
          handlePressBack={handlePressBack}>
          {loading ? (
              <div className='loading'>
                    <LoadingIndicator />
            </div>
            ) : !robotData ? (
            <NoRecentData message='No recent data available' />
            ) : (
                <>
                <HeaderRobotsRobotPage robotSubscribe={robotSubscribe} robotData={robotData} />
                <TabsHeaderRobotPage
                    activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    isUserSignals={robotData.robot.isUserSignals}
                    />
                    <TabsPagesRobotPage robotData={robotData} activeTab={activeTab} width={width} />
                <ModalsRobotPage visibleModal={visibleModal} setVisibleModal={setVisibleModal} />
              </>
            )}
        </Template>
  );
};
