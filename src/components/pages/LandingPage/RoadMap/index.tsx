import React, { memo } from 'react';

import { Step } from './Step';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import { steps } from '../helpers';
import styles from './index.module.css';

const _RoadMap: React.FC = () => {
  const { width } = useWindowDimensions();
  const isVertical = width <= 992;

  return (
    <div className={styles.container}>
      <div className={styles.stepsContainer}>
        {steps.map((step, idx) => <Step step={step} idx={idx} key={idx} isVertical={isVertical} />)}
      </div>
    </div>
  );
};

export const RoadMap = memo(_RoadMap);
