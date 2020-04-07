import * as Sets from './NotificationsSets';
//import * as SetsCard from './NotificationsSetsCard';
import { color } from '../../../config/constants';

const actionTypes = [ 'long', 'closeShort' ];
const actionSignals = [ 'long', 'short' ];
export const actionName = (action) => (actionTypes.includes(action) ? 'BUY' : 'SELL');
export const actionIcon = (action) => (actionTypes.includes(action) ? 'arrowup' : 'arrowdown');
export const actionColor = (action) => (actionTypes.includes(action) ? color.positive : color.negative);
export const actionOpen = (action) => (actionSignals.includes(action));

export const getFormatData = (notifications) => (
  notifications.map(notification => {
    const { type, data, user_robot, user_position, robot_position, robot, timestamp, readed, id } = notification;
    return {
      id,
      type,
      data,
      timestamp,
      readed,
      user_position,
      robot_position,
      robot: user_robot ? {
        code: user_robot.robot.code,
        name: user_robot.robot.name,
        asset: user_robot.robot.asset,
      } : robot ? {
        code: robot.code,
        name: robot.name,
        asset: robot.asset,
      } : null
    };
  })
);

const messageMap = {
  'user-robot.failed': 'failed',
  'user-robot.started': 'robot',
  'user-robot.stopped': 'robot',
  'user-robot.paused': 'robot',
  'user-robot.resumed': 'robot',
  'user-robot.trade': 'robotTrade',
  'signal.trade': 'signalTrade',
  'signal.alert': 'signalAlert',
  'order.error': 'error',
  'message.support-reply': 'message',
  'message.broadcast': 'message',
  'user_ex_acc.error': 'user'
};

export const showMessage = (item, card = false) => {
  //const setFunc = card ? SetsCard : Sets;
  const setFunc = Sets;
  const messages = {
    failed: () => setFunc.failedSet(item),
    message: () => setFunc.messageSet(item),
    robotTrade: () => setFunc.robotTradeSet(item),
    error: () => setFunc.errorSet(item),
    signalAlert: () => setFunc.signalAlertSet(item),
    robot: () => setFunc.robotSet(item),
    signalTrade: () => setFunc.signalTradeSet(item),
    user: () => setFunc.userSet(item)
  };

  return messages[messageMap[item.type]]();
};

export const getRedirectionLink = (item) => {
  const links = {
    failed: () => ({ link: process.env.SUPPORT_URL, redirect: true }),
    message: () => ({ link: process.env.SUPPORT_URL, redirect: true }),
    robotTrade: () => ({ link: `/robots/robot/${item.robot.code}`, redirect: false }),
    error: () => ({ link: process.env.SUPPORT_URL, redirect: true }),
    signalAlert: () => ({ link: `/signals/robot/${item.robot.code}`, redirect: false }),
    robot: () => ({ link: `/robots/robot/${item.robot.code}`, redirect: false }),
    signalTrade: () => ({ link: `/signals/robot/${item.robot.code}`, redirect: false }),
    user: () => ({ link: '/profile', redirect: true })
  };

  return links[messageMap[item.type]]();
};
