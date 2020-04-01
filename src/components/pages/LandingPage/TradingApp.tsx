import React, { memo } from 'react';

import { PrimaryButton } from '../../basic';
import styles from './TradingApp.module.css';

const _TradingApp: React.FC = () => (
  <div className={responsive.app(screenType)}>
    <div className={{ alignItems: 'center', flex: 1 }}>
      <div className={styles.robotsSteps}>
        <div className={styles.robotsStepsTitle}>
          Cryptuoso Trading App
        </div>
        <div className={styles.robotsStep}>
          <div className={styles.robotsStepCircle}>
            <Svg height='10' width='10' viewBox='0 0 100 100'>
              <Circle cx='50' cy='50' r='50' fill='white' />
            </Svg>
          </div>
          <div className={responsive.robotsStepText(screenType)}>
            <div className={styles.robotsTextAccent}>Inspect</div>{' '}
            robots public statistics we collected on over 2,5 years
            of trading in&nbsp;the cryptocurrency market.
          </div>
        </div>
        <div className={styles.robotsStep}>
          <div className={styles.robotsStepCircle}>
            <Svg height='10' width='10' viewBox='0 0 100 100'>
              <Circle cx='50' cy='50' r='50' fill='white' />
            </Svg>
          </div>
          <div className={responsive.robotsStepText(screenType)}>
            <div className={styles.robotsTextAccent}>Choose</div> your
            favorite robots for work on long term or medium-term
            intervals.
          </div>
        </div>
        <div className={styles.robotsStep}>
          <div className={styles.robotsStepCircle}>
            <Svg height='10' width='10' viewBox='0 0 100 100'>
              <Circle cx='50' cy='50' r='50' fill='white' />
            </Svg>
          </div>
          <div className={responsive.robotsStepText(screenType)}>
            <div className={styles.robotsTextAccent}>Combine</div>{' '}
            robots into a single unit as&nbsp;a&nbsp;portfolio of
            automated trading systems.
          </div>
        </div>
        <div className={{ marginHorizontal: 'auto' }}>
          <PrimaryButton
            title={t('Start now')}
            type='secondary'
            size='big'
            href='/robots'
          />
        </div>
      </div>
    </div>
    <div className={[ responsive.tradingAppImgContainer(screenType), { flex: 1 } ]}>
      <Image
        resizeMode='contain'
        className={responsive.tradingAppImg(screenType)}
        source={require('../../../assets/img/trading-app.png')}
      />
    </div>
  </div>
);

export const TradingApp = memo(_TradingApp);
