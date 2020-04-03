import React, { memo } from 'react';

import { TabType } from '../../../config/types';
import { TabButton } from '../../basic';
//import { common } from '../../../styles';
import styles from './TabsHeaderRobotPage.module.css';

interface Props {
  activeTab: TabType;
  setActiveTab: (activeTab: TabType) => void;
  isUserSignals: boolean;
}

const tabNames = {
  trading: 'Trading',
  myStatistic: 'My Performance',
  publicStatistic: 'Public Performance'
};

const _TabsHeaderRobotPage: React.FC<Props> = ({ activeTab, setActiveTab, isUserSignals }) => {
//const isMobile = screenType.maxPhone();
  return (
    <div className={styles.tabsHeader}>
      <div className={styles.tabsBtns}>
        {/* <View style={[ common.tabsBtns(screenType),
          isMobile ? { marginTop: 8, justifyContent: 'center' } : null,
        isMobile && isUserSignals ? { marginHorizontal: 30 } : null ]}> */}
        { Object.keys(tabNames).map(key => (
          ((isUserSignals && key === 'myStatistic') || (key !== 'myStatistic')) ? (
            <TabButton
              key={key}
              title={tabNames[key]}
              isActive={TabType[key] === activeTab}
              handleOnClick={() => setActiveTab(TabType[key])}
              objectStyle={styles.objectStyle} />
          ) : null
        )) }
      </div>
    </div>
  );
};

export const TabsHeaderRobotPage = memo(_TabsHeaderRobotPage);
