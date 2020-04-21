import { setModalState, setRobot, setChartData, setSearchFilters, setSearchProps } from './resolvers/local';
import { unsubscribe, subscribe } from './resolvers/signals';
import { deleteRobot, actionRobot, createRobot, editRobot } from './resolvers/robots';

export const resolvers = {
  Mutation: {
    setModalState,
    setRobot,
    setChartData,
    setSearchFilters,
    setSearchProps,
    unsubscribe,
    subscribe,
    deleteRobot,
    actionRobot,
    createRobot,
    editRobot,
  }
};
