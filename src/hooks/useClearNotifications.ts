import { useMutation } from '@apollo/react-hooks';

import { GET_NOTIFICATIONS_AGGREGATE } from '../graphql/user/queries';
import { UPDATE_NOTIFICATIONS } from '../graphql/user/mutations';

export const useClearNotifications = () => {
  const [updateReaded] = useMutation(UPDATE_NOTIFICATIONS, {
    refetchQueries: [
      {
        query: GET_NOTIFICATIONS_AGGREGATE,
        variables: {
          where: { readed: { _eq: false } }
        }
      }
    ]
  });

  const updateNotifications = () => {
    updateReaded({
      variables: {
        _set: { readed: true },
        where: { readed: { _eq: false } }
      }
    });
  };

  return { updateNotifications };
};
