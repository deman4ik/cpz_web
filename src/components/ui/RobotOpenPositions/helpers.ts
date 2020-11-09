import { color } from "config/constants";
import { formatDate, formatMoney, getUserSignalVolume, getRobotVolume, round } from "config/utils";

export const getColor = (condition: boolean) => (condition ? color.negative : color.positive);
export const getIconName = (direction: string) => (direction === "short" ? "arrow-down" : "arrow-up");

const getSignalPositionData = (position) => {
    const { id, code, direction, entry_date, entry_price, profit, robot } = position;
    return {
        id,
        code,
        volume: position.volume,
        entry_price: formatMoney(entry_price),
        entry_date: entry_date ? formatDate(entry_date) : "",
        direction,
        profit,
        robot: {
            name: robot.name,
            code: robot.code,
            asset: robot.asset
        }
    };
};

export const formatSignalsPositions = (positions: any) =>
    positions?.reduce((acc, position) => {
        const item = acc.find((el) => el.exchange === position.robot.exchange);
        const obj = {
            exchange: position.robot.exchange,
            assets: []
        };
        const robot = getSignalPositionData(position);
        const asset = {
            asset: position.robot.asset,
            volume: (position.direction === "short" ? -1 : 1) * position.volume,
            profit: position.profit,
            robots: [robot]
        };
        if (item) {
            const findAsset = item.assets.find((el) => el.asset === position.robot.asset);
            if (!findAsset) {
                item.assets.push(asset);
            } else {
                findAsset.robots.push(robot);
                findAsset.volume = round(
                    findAsset.volume + (robot.direction === "short" ? -1 : 1) * position.volume,
                    6
                );
                findAsset.profit = (findAsset.profit || 0) + (robot.profit || 0);
            }
        } else {
            obj.assets = [asset];
        }
        return item ? acc : [...acc, obj];
    }, []) || [];

const getTradingPositionData = (position) => {
    const { id, code, direction, entry_date, entry_price, volume, asset, profit, user_robot } = position;
    return {
        id,
        code,
        volume,
        entry_price: formatMoney(entry_price),
        entry_date: entry_date ? formatDate(entry_date) : "",
        direction,
        profit,
        robot: {
            name: user_robot?.robot?.name,
            code: user_robot?.robot?.code,
            asset
        }
    };
};

export const formatTradingRobotPositions = (positions: any) =>
    positions?.reduce((acc, position) => {
        const item = acc.find((el) => el.exchange === position.exchange);
        const obj = {
            exchange: position.exchange,
            assets: []
        };
        const robot = getTradingPositionData(position);
        const asset = {
            asset: position.asset,
            volume: (position.direction === "short" ? -1 : 1) * position.volume,
            profit: position.profit,
            robots: [robot]
        };
        if (item) {
            const findAsset = item.assets.find((el) => el.asset === position.asset);
            if (!findAsset) {
                item.assets.push(asset);
            } else {
                findAsset.robots.push(robot);
                findAsset.volume = round(findAsset.volume + (robot.direction === "short" ? -1 : 1) * robot.volume, 6);
                findAsset.profit = (findAsset.profit || 0) + (robot.profit || 0);
            }
        } else {
            obj.assets = [asset];
        }
        return item ? acc : [...acc, obj];
    }, []) || [];
