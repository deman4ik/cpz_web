import React, { memo } from 'react';

import { Step } from './Step';
import styles from './index.module.css';

interface StepProps {
  date: string;
  title: string;
}

const steps: StepProps[] = [
  { date: '2017', title: 'Public Trading\nSignals' },
  { date: '2018', title: 'Cryptuoso\nTrading Engine' },
  { date: 'Q2 2019', title: 'Cryptuoso\nLanding Page' },
  { date: 'Q3 2019', title: 'Premium individual trading\nfor private investors' },
  { date: 'Q4 2019', title: 'Cryptuoso Trading\nTelegram Bot (Beta)' },
  { date: 'Q1 2020', title: 'Cryptuoso Trading\nWeb App (Beta)' },
  { date: 'Q2 2020', title: 'Cryptuoso Trading\nMobile App (Beta)' },
];

const _RoadMap: React.FC = () => (
  <div className={styles.container}>
    <div className={styles.stepsContainer}>
      {steps.map((step, idx) => <Step step={step} idx={idx} key={idx} />)}
    </div>
  </div>
);

export const RoadMap = memo(_RoadMap);
