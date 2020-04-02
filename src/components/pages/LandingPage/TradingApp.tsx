import React, { memo } from 'react';

import tradingApp from '../../../assets/img/trading-app.png';
import { PrimaryButton } from '../../basic';
import { CircleIcon } from '../../../assets/icons/svg';
import styles from './TradingApp.module.css';

const _TradingApp: React.FC = () => (
  <div className={styles.app}>
    <div className={styles.row}>
      <div className={styles.robotsSteps}>
        <div className={styles.robotsStepsTitle}>
          Cryptuoso Trading App
        </div>
        <div className={styles.robotsStep}>
          <div className={styles.robotsStepCircle}>
            <CircleIcon color='white' />
          </div>
          <div className={styles.robotsStepText}>
            <span className={styles.robotsTextAccent}>Inspect</span>{' '}
            robots public statistics we collected on over 2,5 years
            of trading in&nbsp;the cryptocurrency market.
          </div>
        </div>
        <div className={styles.robotsStep}>
          <div className={styles.robotsStepCircle}>
            <CircleIcon color='white' />
          </div>
          <div className={styles.robotsStepText}>
            <span className={styles.robotsTextAccent}>Choose</span> your
            favorite robots for work on long term or medium-term
            intervals.
          </div>
        </div>
        <div className={styles.robotsStep}>
          <div className={styles.robotsStepCircle}>
            <CircleIcon color='white' />
          </div>
          <div className={styles.robotsStepText}>
            <span className={styles.robotsTextAccent}>Combine</span>{' '}
            robots into a single unit as&nbsp;a&nbsp;portfolio of
            automated trading systems.
          </div>
        </div>
        <div style={{ margin: '0 auto' }}>
          <PrimaryButton
            title='Start now'
            type='secondary' />
        </div>
      </div>
    </div>
    <div className={styles.tradingAppImgContainer}>
      <img
        className={styles.tradingAppImg}
        src={tradingApp}
        alt=''
      />
    </div>
  </div>
);

export const TradingApp = memo(_TradingApp);
