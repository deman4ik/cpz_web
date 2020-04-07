import React, { PropsWithChildren, memo, useMemo, useState, useEffect } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';

import { GET_AGGR_STATISTICS, GET_USER_AGGR_STATS_FILTERS } from '../../../graphql/signals/queries';
import { useDimensionWidth } from '../../../hooks/useDimensions';
import { POLL_INTERVAL } from '../../../config/constants';
import { NoRecentData } from '../../ui/Common/NoRecentData';
import { useFilters } from '../../../hooks/useFilters';
import { Template } from '../../layout';
import { capitalize } from '../../../services/Utils';
import { getFormatData, getSubTitle, getLabelCombinations, getQueueType } from './helpers';
import { PageType } from '../../../config/types';
import { StatsPageButtonToolbar } from './StatsPageButtonToolbar';
import { StatsPageComponent } from './StatsPageComponent';
import { StatsPageFilters } from './StatsPageFilters';
import { Modal, Button } from '../../basic';
import { CheckedFilters, LabelCombinations } from './types';
import { common } from '../../../styles';
import { styles } from './index.style';

const _StatsPage: React.FC<PropsWithChildren<WithTranslation>> = ({ t }) => {
  const router = useRouter();
  const displayType = router.route.split('/')[1];
  const { dimension } = useDimensionWidth();
  const { screenType, setDimension, screenWidth, isMobile } = dimension;
  const [ isVisibleFilters, setIsVisibleFilters ] = useState(false);
  const [ filtersCombinations, setFiltersCombinations ] = useState<CheckedFilters[]>([]);
  const [ labelCombinations, setLabelCombinations ] = useState<LabelCombinations>({ exchange: [], asset: [] });
  const [ skipFilterQuery, setSkipFilterQuery ] = useState(false);
  const { exchange: _exchange, asset: _asset } = router.query;
  const { checkedFilters, clearFilters, checkFilterButton, selectedFilter, confirmSelectedFilters } = useFilters(_exchange, _asset);
  const handlePressBack = () => {
    router.push(`/${displayType}`);
  };

  const { loading, data } = useQuery(GET_AGGR_STATISTICS, {
    variables: {
      asset: selectedFilter.asset ? { _eq: selectedFilter.asset } : { _is_null: true },
      exchange: selectedFilter.exchange ? { _eq: selectedFilter.exchange } : { _is_null: true },
      type: getQueueType(displayType)
    },
    pollInterval: POLL_INTERVAL
  });

  const { data: dataFilter, loading: loadingFilter } = useQuery(GET_USER_AGGR_STATS_FILTERS, {
    variables: {
      type: getQueueType(displayType)
    },
    skip: skipFilterQuery
  });

  const getOppositeFilterName = (filterName: string) => (filterName === 'asset' ? 'exchange' : 'asset');

  const getAvailableFilters = (field: string, filter?: string, oppositeFilter?: string): string[] => {
    const oppositeFilterName: string = getOppositeFilterName(field);
    return !oppositeFilter ? (filtersCombinations.filter(item =>
      (item[field] === filter && item[oppositeFilterName] !== null))).map(item => (
      item[oppositeFilterName]
    )) :
      (filtersCombinations.filter(item =>
        (item[field] === filter && item[oppositeFilterName] === oppositeFilter))).map(item => (
        item[oppositeFilterName]
      ));
  };

  useEffect(() => {
    if (!loadingFilter && dataFilter) {
      setFiltersCombinations(dataFilter.filters);
      setLabelCombinations(getLabelCombinations(dataFilter.filters));
      setSkipFilterQuery(true);
    }
  }, [ loadingFilter, dataFilter ]);

  const availableFilters = useMemo(() => {
    if (!skipFilterQuery) return { exchange: [], asset: [] };
    const filters = { exchange: [], asset: [] };
    Object.keys(checkedFilters).forEach(item => {
      filters[getOppositeFilterName(item)] = getAvailableFilters(item, checkedFilters[item]);
    });
    return filters;
  }, [ skipFilterQuery, checkedFilters ]);

  useEffect(() => {
    if (skipFilterQuery) {
      const url = `/${displayType}/stats?exchange=${selectedFilter.exchange}&asset=${selectedFilter.asset}`;
      if (typeof window !== 'undefined') {
        window.history.pushState('', '', url);
      }
    }
  }, [ skipFilterQuery, selectedFilter ]);

  const formatData = useMemo(
    () => ((!loading && data)
      ? getFormatData(data.stats)
      : { chartData: null, robotStatistic: null }), [ loading, data ]
  );

  const setVisibleToolbarFilters = () => {
    setIsVisibleFilters(prev => !prev);
  };

  const confirmSelectedFilter = () => {
    setIsVisibleFilters(false);
    confirmSelectedFilters();
  };
  console.log('formatData', formatData);
  console.log('data', data);
  return (
    <Template
      page={PageType[displayType]}
      title={t(`My ${capitalize(displayType)} Total Performance`)}
      subTitle={getSubTitle(selectedFilter)}
      toolbar={<StatsPageButtonToolbar setVisibleToolbarFilters={setVisibleToolbarFilters} screenType={screenType} />}
      screenType={screenType}
      screenWidth={screenWidth}
      isMobile={isMobile}
      onLayout={setDimension}
      handlePressBack={handlePressBack}
    >
      <Modal
        title={t(`Filter My Total ${capitalize(displayType)} Performance`)}
        visible={isVisibleFilters}
        screenType={screenType}
        onDismiss={setVisibleToolbarFilters}
        >
        <View style={styles.filtersContainer}>
          <View style={{ marginTop: 5 }}>
            { Object.keys(labelCombinations).map((el: string) => (
              <StatsPageFilters
                key={el}
                label={el}
                labelsCombination={labelCombinations[el]}
                filterItem={{ items: getAvailableFilters(getOppositeFilterName(el), checkedFilters[getOppositeFilterName(el)], checkedFilters[(el)]), label: el }}
                checkedItem={checkedFilters[el]}
                availableFilters={availableFilters[el]}
                checkFilterButton={checkFilterButton} />
            ))}
          </View>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <Button
              title='OK'
              icon='check'
              type='success'
              onPress={confirmSelectedFilter}
              isUppercase />
            <Button
              type='dimmed'
              width={160}
              title='clear filter'
              style={{ marginLeft: 15 }}
              onPress={clearFilters}
              icon='close'
              isUppercase />
          </View>
        </View>
      </Modal>
      <>
        {!formatData.chartData || !formatData.robotStatistic ? (
          <View style={common.loadingContainer}>
            <NoRecentData message={t('No recent data available')} />
          </View>
        ) : (
          <StatsPageComponent
            formatData={formatData}
            dimension={dimension}
            displayType={displayType} />
        ) }
      </>
    </Template>
  );
};

export const StatsPage = memo(withTranslation()(_StatsPage));
