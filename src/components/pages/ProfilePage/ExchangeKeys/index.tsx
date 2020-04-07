import React, { useMemo, memo } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_USER_EXCHANGES } from '../../../../graphql/profile/queries';
import { ExchangeKeysContainer } from './ExchangeKeysContainer';
import styles from './index.module.css';

interface Props {
  title: string;
}

export const _ExchangeKeys: React.FC<Props> = ({ title }) => {
  const { data, loading } = useQuery(GET_USER_EXCHANGES);
  const formatData = useMemo(() => ((!loading && data) ? data.userExchange : []), [ loading, data ]);

  return (
    <div className={styles.container}>
      <div className={styles.regionTitle}>
        {title}
      </div>
      <ExchangeKeysContainer
        formatData={formatData}
      />
    </div>
  );
};

export const ExchangeKeys = memo(_ExchangeKeys);
