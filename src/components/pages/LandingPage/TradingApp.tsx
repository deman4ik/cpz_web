import React, { memo } from 'react';

import tradingApp from '../../../assets/img/trading-app.png';
import { PrimaryButton } from '../../basic';
import { CircleIcon } from '../../../assets/icons/svg';
import { tradingSteps } from './helpers';
import { TradingStepType } from './types';
import styles from './TradingApp.module.css';

const _TradingApp: React.FC = () => (
  <div className={styles.app}>
      <div className={styles.row}>
          <div className={styles.robotsSteps}>
          <h2 className={styles.robotsStepsTitle}>Cryptuoso Trading App</h2>
                {tradingSteps.map((item: TradingStepType, idx: number) => (
              <div key={idx} className={styles.robotsStep}>
                      <div className={styles.robotsStepCircle}>
                          <CircleIcon color='white' />
                        </div>
                      <div className={styles.robotsStepText}>
                            <span className={styles.robotsTextAccent}>{item.accent}</span>
                            {item.text}
                        </div>
                    </div>
                ))}
          <div style={{ margin: '0 auto' }}>
              <PrimaryButton title='Start now' href='/robots' type='secondary' />
            </div>
        </div>
        </div>
        <div className={styles.tradingAppImgContainer}>
      <img className={styles.tradingAppImg} src={tradingApp} alt='' />
    </div>
    </div>
);

export const TradingApp = memo(_TradingApp);
