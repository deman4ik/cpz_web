import { useState, useEffect } from 'react';
import { CheckedFilters } from '../components/pages/StatsPage/types';

export const useFilters = (
  _exchange: string | string[] | undefined,
  _asset: string | string[] | undefined
) => {
  const [checkedFilters, setCheckedFilters] = useState<CheckedFilters>({
    exchange: null,
    asset: null
  });
  const [selectedFilter, setSelectedFilter] = useState<CheckedFilters>({
    exchange: null,
    asset: null
  });

  const checkFilterButton = (label: string, item: string) => {
    if (checkedFilters[label] === item) {
      setCheckedFilters(prev => ({ ...prev, [label]: null }));
    } else {
      setCheckedFilters(prev => ({ ...prev, [label]: item }));
    }
  };

  useEffect(() => {
    const filters = {
      exchange:
        _exchange === 'null' || !_exchange ? null : (_exchange as string),
      asset: _asset === 'null' || !_asset ? null : (_asset as string)
    };

    setCheckedFilters(filters);
    setSelectedFilter(filters);
  }, [_exchange, _asset]);

  const clearFilters = () => {
    setCheckedFilters({ exchange: null, asset: null });
  };

  const confirmSelectedFilters = () => {
    if (
      selectedFilter.asset !== checkedFilters.asset ||
      selectedFilter.exchange !== checkedFilters.exchange
    ) {
      setSelectedFilter(checkedFilters);
    } else {
      checkFilterButton(selectedFilter.exchange, selectedFilter.asset);
    }
  };

  return {
    checkedFilters,
    clearFilters,
    checkFilterButton,
    selectedFilter,
    confirmSelectedFilters
  };
};
