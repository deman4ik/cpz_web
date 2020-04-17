import React from 'react';
import { useRouter } from 'next/router';
import { PageHead } from '../../layout/PageHead';

import styles from './index.module.css';
import { Caption } from './Caption';
import { Description } from './Description';
import { SignalsList } from './SignalsList';
import { TradingApp } from './TradingApp';
import { TelegramBot } from './TelegramBot';
import { RoadMap } from './RoadMap';
import { Support } from './Support';
import { Footer } from '../../layout';

const _LandingPage = () => {
  const router = useRouter();
  const handleOnClick = (path: string, external: boolean) => {
    if (external) {
      window.location.assign(path);
    } else {
      router.push(`${path}`);
    }
  };

  return (
    <>
      <PageHead
        title='Cryptocurrency Trading Platform'
        description='Cryptuoso - Cryptocurrency Trading Platform for your successful investment'
        keywords='cryptocurrency, bitcoin, trading, signals, robots, btc, crypto, mining, bitfinex, bitmex, kraken' />
      <div className={styles.landing}>
        <Caption handleOnClick={handleOnClick} />
        <div className={styles.bodyLanding}>
          <div className={styles.starsBackground} />
          <div className={styles.container}>
            <Description />
            <h2 className={styles.topRobotsTitle}>
              Top Performance Robots
            </h2>
            <SignalsList handleOnClick={handleOnClick} />
            <TradingApp handleOnClick={handleOnClick} />
            <TelegramBot handleOnClick={handleOnClick} />
            <h2 className={styles.roadmapTitle}>
              Cryptuoso roadmap
            </h2>
            <RoadMap />
            <Support handleOnClick={handleOnClick} />
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export const LandingPage = _LandingPage;
