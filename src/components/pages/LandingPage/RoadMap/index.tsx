import React, { memo, useEffect, useState } from 'react';

import { Step } from './Step';
import { steps } from '../helpers';
import styles from './index.module.css';

const _RoadMap: React.FC = () => {
  const [ width, setWidth ] = useState(0);
  const isVertical = width <= 992;

  useEffect(() =>
    setWidth(document.children[0].clientWidth),
  []);

  return (
    <div className={styles.container}>
      <div className={styles.stepsContainer}>
        {steps.map((step, idx) => <Step step={step} idx={idx} key={idx} isVertical={isVertical} />)}
      </div>
    </div>
  );
};

export const RoadMap = memo(_RoadMap);
