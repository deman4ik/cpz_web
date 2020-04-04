/* eslint-disable react/jsx-pascal-case */
import React from 'react';

import useWindowDimensions from '../../../hooks/useWindowDimensions';
import { _LightWeightChart } from './LightWeightChart';
import styles from './index.module.css';
import { PropsWrapChart } from './types';

const LightWeightChart: React.FC<PropsWrapChart> =
({ data, height, type, loading = false, markers, lines, onFetchMore, legend }) => {
  const { width } = useWindowDimensions();
  const isMobile = width <= 450;
  const leftToolBar = width >= 1200 ? 200 : isMobile ? 56 : -15;
  const widthWithToolBar = 1214 + leftToolBar;
  const widthSubtractor = width >= widthWithToolBar ? 0 : widthWithToolBar - width;

  return (
    <div className={styles.container}>
      <_LightWeightChart
        data={data}
        loading={loading}
        type={type}
        markers={markers}
        lines={lines}
        onFetchMore={onFetchMore}
        legend={legend}
        size={{ width: 1180 - widthSubtractor, height }} />
    </div>
  );
};

export default LightWeightChart;
