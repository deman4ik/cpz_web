import React, { memo } from 'react';

import { TabType } from '../../../../config/types';
import { TabButton } from '../../../basic';
import { tabNames } from '../helpers';
import styles from './TabsHeaderRobotPage.module.css';

interface Props {
  activeTab: TabType;
  setActiveTab: (activeTab: TabType) => void;
  isUserSignals: boolean;
}

const _TabsHeaderRobotPage: React.FC<Props> = ({ activeTab, setActiveTab, isUserSignals }) => (
  <div className={styles.tabsHeader}>
    <div className={styles.dummy} />
    <div className={styles.tabsBtns}>
      { Object.keys(tabNames).map(key => (
        ((isUserSignals && key === 'myStatistic') || (key !== 'myStatistic')) ? (
          <TabButton
            key={key}
            title={tabNames[key]}
            isActive={TabType[key] === activeTab}
            handleOnClick={() => setActiveTab(TabType[key])}
            objectClassName={styles.objectStyle}
            textClassName={styles.textClassName} />
        ) : null
      )) }
    </div>
    <div className={styles.dummy} />
  </div>
);

export const TabsHeaderRobotPage = memo(_TabsHeaderRobotPage);
