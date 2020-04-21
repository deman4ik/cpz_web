import React, { useState, memo } from 'react';

import { SearchFiltersMenu } from './SearchFiltersMenu';
import { Filters } from './Filters';
import { Orders } from './Orders';
import { TabTypeFilters } from './types';

interface Props {
  onClose: () => void;
  displayType: string;
}

const _SearchFiltersModal: React.FC<Props> = ({ onClose, displayType }) => {
  const [ activeTab, setActiveTab ] = useState<TabTypeFilters>(TabTypeFilters.filters);

  return (
    <>
      <SearchFiltersMenu activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === TabTypeFilters.filters && (
        <Filters onClose={onClose} displayType={displayType} />) }
      {activeTab === TabTypeFilters.orders && (
        <Orders onClose={onClose} displayType={displayType} />) }
    </>
  );
};

export const SearchFiltersModal = memo(_SearchFiltersModal);
