/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';

import { CartFooter } from './common/CartFooter';
import { USER } from '../../../graphql/local/queries';
import { activate } from '../../../libs/auth';
import { Footer, PageHead, Header } from '../../layout';
import styles from './index.module.css';

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
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.container}>
      <PageHead title='Done!' />
      <div className={styles.header}>
        <Header hasHomeButton />
      </div>
      <div className={styles.plate}>
        <div className={styles.cardWrapper}>
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
