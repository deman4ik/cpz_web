import React, { memo } from 'react';

import { PrimaryButton } from '../../basic';
import phoneImg from '../../../assets/img/phone-img.png';
import { CircleIcon } from '../../../assets/icons/svg';
import styles from './TradingApp.module.css';

const _TelegramBot: React.FC = () => (
  <div className={styles.free}>
    <div className={styles.row}>
      <img
        src={phoneImg}
        className={styles.telegramBotImg}
        alt=''
      />
    </div>
    <div className={styles.row}>
      <div className={styles.robotsSteps}>
        <div className={styles.robotsStepsTitle}>
          Cryptuoso Trading{'\n'}
          Telegram Bot
        </div>
        <div className={styles.robotsStep}>
          <div className={styles.robotsStepCircle}>
            <CircleIcon color='white' />
          </div>
          <div className={styles.robotsStepText}>
            <span className={styles.robotsTextAccent}>Manage</span> your Cryptuoso robots and subscriptions <span className={styles.robotsTextAccent}>directly from Telegram</span>.
          </div>
        </div>
        <div className={styles.robotsStep}>
          <div className={styles.robotsStepCircle}>
            <CircleIcon color='white' />
          </div>
          <div className={styles.robotsStepText}>
            The most convenient way to <span className={styles.robotsTextAccent}>quickly receive trading signals and alerts</span> from robots in real time.
          </div>
        </div>
        <div style={{ margin: '0 auto' }}>
          <PrimaryButton
            title='Try it now'
            type='primary' />
        </div>
      </div>
    </div>
  </div>
);

export const TelegramBot = memo(_TelegramBot);
