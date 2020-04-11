import React, { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_NOTIFICATIONS_AGGREGATE } from '../../../graphql/user/queries';
import { useClearNotifications } from '../../../hooks/useClearNotifications';
import { POLL_INTERVAL } from '../../../config/constants';

interface Props {
  isPhone?: boolean;
}

const getIndentLength = (count: number) => (
  count.toString().length >= 2 && count > 10 ? 3 : count.toString().length
);

const indent = {
  1: 25,
  2: 27,
  3: 20,
};

export const NotificationCounter: React.FC<Props> = ({ isPhone }) => {
  const { updateNotifications } = useClearNotifications();
  const { data } = useQuery(GET_NOTIFICATIONS_AGGREGATE, {
    variables: {
      where: { readed: { _eq: false } }
    },
    pollInterval: POLL_INTERVAL
  });

  const count = useMemo(() => (
    (data && data.notifications_aggregate && data.notifications_aggregate.aggregate.count)
      ? data.notifications_aggregate.aggregate.count : 0), [ data ]);

  return (
    <>
      { (data && data.notifications_aggregate && count) ? (
        <div
          className='container'
          onClick={updateNotifications}
        >
          <div className='content'>
            {count > 10 ? '10+' : count}
          </div>
          <style jsx>{`
            .container {
              background-color: var(--primary);
              border-radius: 8px;
              width: min-content;
              position: absolute;
              top: 7px;
              left: ${indent[getIndentLength(count)]}px;
            }
            .content {
              padding: 2px ${count === 1 ? 7 : 4}px;
              color: white;
              font-size: 10px;
            }
          `}
          </style>
        </div>
      ) : null}
    </>
  );
};
