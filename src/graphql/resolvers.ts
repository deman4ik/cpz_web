import { setModalState, setRobot, setChartData, setSearchProps, setSearchLimit } from './resolvers/local';
import { unsubscribe, subscribe } from './resolvers/signals';
import { deleteRobot, actionRobot, createRobot, editRobot } from './resolvers/robots';

export const resolvers = {
  Mutation: {
    setModalState,
    setRobot,
    setChartData,
    setSearchProps,
    setSearchLimit,
    unsubscribe,
    subscribe,
    deleteRobot,
    actionRobot,
    createRobot,
    editRobot,
  }
};
