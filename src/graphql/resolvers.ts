import { setModalState, setRobot, setChartData } from './resolvers/local';
import { unsubscribe, subscribe } from './resolvers/signals';
import { deleteRobot, actionRobot, createRobot, editRobot } from './resolvers/robots';

export const resolvers = {
  Mutation: {
    setModalState,
    setRobot,
    setChartData,
    unsubscribe,
    subscribe,
    deleteRobot,
    actionRobot,
    createRobot,
    editRobot
  }
};
