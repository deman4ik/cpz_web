/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';

import { CartFooter } from './common';
import { USER } from '../../../graphql/local/queries';
import { activate } from '../../../libs/auth';
import { Footer, PageHead } from '../../layout';
import { HeaderMenu } from '../../layout/HeaderMenu';
import styles from './Done.module.css';

export const Activate: React.FC = () => {
  const { data, loading } = useQuery(USER);
  const router = useRouter();

  const activateCode = async () => {
    const result = await activate(router.query.encoded as string);
    if (!result) {
      console.error('activation failed');
    }
  };

  useEffect(() => {
    if (router.query.encoded) {
      activateCode();
    }
  }, [ router.query.encoded ]);

  useEffect(() => {
    if (!loading && data && !data.userId && !router.query.encoded) {
      Router.push('/auth/signup');
    }
  }, [ data, loading ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      Router.push('/robots');
    }, 2000 * 60);
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
            <div className={styles.titleDescription}>You have successfully Activate your account</div>
          </div>
          <CartFooter />
        </div>
      </div>
      <Footer />
    </div>
  );
};
