import {
  setModalState,
  setRobot,
  setChartData,
  setSearchProps,
  setSearchLimit,
  setNotificationsProps
} from './resolvers/local';
import { unsubscribe, subscribe } from './resolvers/signals';
import {
  deleteRobot,
  actionRobot,
  createRobot,
  editRobot
} from './resolvers/robots';

export const resolvers = {
  Mutation: {
    setModalState,
    setRobot,
    setChartData,
    setSearchProps,
    setSearchLimit,
    setNotificationsProps,
    unsubscribe,
    subscribe,
    deleteRobot,
    actionRobot,
    createRobot,
    editRobot
  }
};
