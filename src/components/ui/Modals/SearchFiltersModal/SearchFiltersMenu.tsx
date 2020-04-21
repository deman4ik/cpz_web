import React, { memo } from 'react';

import { TabTypeFilters } from './types';
import { TabButton } from '../../../basic';
import { tabNames } from './helpers';
import styles from './SearchFiltersMenu.module.css';

interface Props {
  activeTab?: TabTypeFilters;
  setActiveTab?: (activeTab: TabTypeFilters) => void;
}

const _SearchFiltersMenu: React.FC<Props> = ({ activeTab, setActiveTab }) => (
  <div className={styles.tabsHeader}>
    <div className={styles.tabsBtns}>
      { Object.keys(tabNames).map(key => (
        <TabButton
          key={key}
          title={tabNames[key]}
          isActive={TabTypeFilters[key] === activeTab}
          handleOnClick={() => setActiveTab(TabTypeFilters[key])}
          objectClassName={styles.objectStyle}
          textClassName={styles.textClassName} />
      )) }
    </div>
  </div>
);

export const SearchFiltersMenu = memo(_SearchFiltersMenu);
