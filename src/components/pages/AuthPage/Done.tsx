import React, { useEffect } from 'react';
import Router from 'next/router';

import { CartFooter } from './common';
import { Footer, PageHead } from '../../layout';
import { HeaderMenu } from '../../layout/HeaderMenu';
import styles from './Done.module.css';

export const Done: React.FC = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      Router.push('/robots');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.container}>
      <PageHead title='Done!' />
      <div className={{ width: '100%', maxWidth: 1280 }}>
        <HeaderMenu hasHomeButton />
      </div>
      <div className={styles.plate}>
        <div className={{ backgroundColor: '#242B4A' }}>
          <div className={styles.card}>
            <div className={styles.title}>Done!</div>
            <div className={styles.titleDescription}>You have successfully updated your password</div>
          </div>
          <CartFooter />
        </div>
      </div>
      <Footer />
    </div>
  );
};
