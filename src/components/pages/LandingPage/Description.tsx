import React, { memo } from 'react';

import { DescriptionView } from './DescriptionView';
import styles from './Description.module.css';
import common_styles from '../../../config/common.module.css';

const _Description: React.FC = () => (
  <div className={common_styles.container}>
    <div className={styles.title}>
      Still trading manually and constantly watching news
      trying to catch the trend? Follow the courses
      <span className={styles.textWhite}>&nbsp;day&nbsp;</span>and
      <span className={styles.textAccent}>&nbsp;night</span>?
    </div>
    <div className={styles.line}>
      <div className={styles.text}>
        Cryptuoso provides&nbsp;
        <span className={styles.textWhite}>
          automated cryptocurrency trading robots
        </span>{' '}
        built on carefully tested trading algorithms.
      </div>
    </div>
    <div className={styles.line}>
      <div className={styles.text}>
        <span className={styles.textWhite}>Trading robots</span> make money on
        both <span className={styles.textGreen}>rising</span> and{' '}
        <span className={styles.redText}>falling</span> cryptocurrency price
        movements. The more volatile market – the more opportunities for robots.
      </div>
    </div>
    <div className={styles.line}>
      <div className={styles.text}>
        <span className={styles.textWhite}>Robots instantly respond</span> to
        cryptocurrency market fluctuations{' '}
        <span className={styles.textWhite}>and generate trading signals</span>{' '}
        that are safely transmitted to the сryptocurrency exchange on your behalf.
      </div>
    </div>
    <DescriptionView />
  </div>
);

export const Description = memo(_Description);
