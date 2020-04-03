import React, { memo } from 'react';
import dynamic from 'next/dynamic';

import BigLogo from '../../../../assets/img/big-logo.png';
import { PrimaryButton } from '../../../basic';
import { Header } from '../../../layout';
import styles from './index.module.css';

const DinamicImageWithNoSSR = dynamic(
  () => import('./DinamicImage'),
  { loading: () => <div className={styles.loading} />,
    ssr: false }
);

const subTitle = 'Just invest –\n robots make the rest';
export const _Caption: React.FC = () => (
  <>
    <DinamicImageWithNoSSR />
    <div className={styles.header}>
      <div className={styles.container}>
        <Header />
        <div className={styles.headerBody}>
          <div className={styles.groupBrand}>
            <div className={styles.brand}>
              <div className={styles.brandName}>
                CRYPTUOSO
              </div>
              <div className={styles.brandRights}>®</div>
            </div>
            <div className={styles.title}>
              Cryptocurrency trading robots for&nbsp;your&nbsp;successful investment
            </div>
            <div className={styles.subTitle}>
              {subTitle}
            </div>
            <div className={styles.headerGroupBtn}>
              <PrimaryButton title='TRY IT FREE' type='secondary' style={styles.headerBtn} />
              <PrimaryButton title='DOCUMENTATION' type='primary' style={styles.headerBtn} />
            </div>
          </div>
          <div className={styles.logoWrapper}>
            <img
              className={styles.bigLogo}
              src={BigLogo}
              alt='' />
          </div>
        </div>
      </div>
    </div>
  </>
);

export const Caption = memo(_Caption);