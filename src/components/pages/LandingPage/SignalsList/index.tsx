import React, { memo } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_LANDING_ROBOTS } from '../../../../graphql/robots/queries';
import { PrimaryButton } from '../../../basic';
import { SignalsListCard } from './SignalsListCard';
import styles from './index.module.css';

const _SignalsList: React.FC = () => {
  const { data, loading } = useQuery(GET_LANDING_ROBOTS, {
    variables: { limit: 5 }
  });

  return (
    <>
      { loading || !data ? null : (
        <div className={styles.container}>
          {data.v_robots_stats.map(item => (
            <SignalsListCard
              key={item.robots.id}
              robot={item.robots} />
          ))}
          <div className={styles.moreBtn}>
            <PrimaryButton
              title='More Robots'
              type='primary' />
          </div>
        </div>
      )}
    </>
  );
};

export const SignalsList = memo(_SignalsList);
