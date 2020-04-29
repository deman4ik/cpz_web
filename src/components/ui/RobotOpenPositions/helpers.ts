import { color } from '../../../config/constants';
import { formatDate, moneyFormat, round } from '../../../config/utils';

export const getColor = (condition: boolean) =>
  condition ? color.negative : color.positive;
export const getIconName = (direction: string) =>
  direction === 'short' ? 'arrow-down' : 'arrow-up';

const getRobotDataSignals = position => {
  const {
    id,
    code,
    direction,
    entry_date,
    entry_price,
    robot,
    user_signal
  } = position;
  return {
    id,
    code,
    volume: user_signal.volume,
    entry_price: moneyFormat(entry_price),
    entry_date: entry_date ? formatDate(entry_date) : '',
    direction,
    robot: {
      name: robot.name,
      code: robot.code,
      asset: robot.asset
    }
  };
};

export const getFormatDataSignals = (positions: any) =>
  positions.reduce((acc, position) => {
    const item = acc.find(el => el.exchange === position.robot.exchange);
    const obj = {
      exchange: position.robot.exchange,
      assets: []
    };
    const robot = getRobotDataSignals(position);
    const asset = {
      asset: position.robot.asset,
      volume:
        (position.direction === 'short' ? -1 : 1) * position.user_signal.volume,
      robots: [robot]
    };
    if (item) {
      const findAsset = item.assets.find(
        el => el.asset === position.robot.asset
      );
      if (!findAsset) {
        item.assets.push(asset);
      } else {
        findAsset.robots.push(robot);
        findAsset.volume = round(
          findAsset.volume +
            (robot.direction === 'short' ? -1 : 1) * robot.volume,
          6
        );
      }
    } else {
      obj.assets = [asset];
    }
    return item ? acc : [...acc, obj];
  }, []);

const getRobotDataRobots = position => {
  const {
    id,
    code,
    direction,
    entry_date,
    entry_price,
    volume,
    asset,
    user_robot
  } = position;
  return {
    id,
    code,
    volume,
    entry_price: moneyFormat(entry_price),
    entry_date: entry_date ? formatDate(entry_date) : '',
    direction,
    robot: {
      name: user_robot.robot.name,
      code: user_robot.robot.code,
      asset
    }
  };
};

export const getFormatDataRobots = (positions: any) =>
  positions.reduce((acc, position) => {
    const item = acc.find(el => el.exchange === position.exchange);
    const obj = {
      exchange: position.exchange,
      assets: []
    };
    const robot = getRobotDataRobots(position);
    const asset = {
      asset: position.asset,
      volume: (position.direction === 'short' ? -1 : 1) * position.volume,
      robots: [robot]
    };
    if (item) {
      const findAsset = item.assets.find(el => el.asset === position.asset);
      if (!findAsset) {
        item.assets.push(asset);
      } else {
        findAsset.robots.push(robot);
        findAsset.volume = round(
          findAsset.volume +
            (robot.direction === 'short' ? -1 : 1) * robot.volume,
          6
        );
      }
    } else {
      obj.assets = [asset];
    }
    return item ? acc : [...acc, obj];
  }, []);

export const title = {
  signals: 'My Signals Open Positions',
  robots: 'My Robots Open Positions'
};
