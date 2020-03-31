import React from 'react';
import { PageHead } from '../../layout/PageHead';

import styles from './index.module.css';
import { Header } from './Header';

const _LandingPage = () => (
  <>
    <PageHead
      title='Cryptocurrency Trading Platform'
      description='Cryptuoso - Cryptocurrency Trading Platform for your successful investment'
      keywords='cryptocurrency, bitcoin, trading, signals, robots, btc, crypto, mining, bitfinex, bitmex, kraken' />
    <div className={styles.landing}>
      <Header />
      Landing page
    </div>
  </>
);

export const LandingPage = _LandingPage;
