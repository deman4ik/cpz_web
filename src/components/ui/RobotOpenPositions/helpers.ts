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
        const existingExchange = acc.find((el) => el.exchange === position.robot.exchange);
        const newExchange = {
            exchange: position.robot.exchange,
            profit: 0,
            assets: []
        };
        const robot = getSignalPositionData(position);
        const asset = {
            asset: position.robot.asset,
            volume: (position.direction === "short" ? -1 : 1) * position.volume,
            profit: position.profit,
            robots: [robot]
        };
        if (existingExchange) {
            const existingAsset = existingExchange.assets.find((el) => el.asset === position.robot.asset);
            if (!existingAsset) {
                existingExchange.assets.push(asset);
                existingExchange.profit += asset.profit;
            } else {
                existingAsset.robots.push(robot);
                existingAsset.volume = round(
                    existingAsset.volume + (robot.direction === "short" ? -1 : 1) * position.volume,
                    6
                );
                existingAsset.profit = (existingAsset.profit || 0) + (robot.profit || 0);
                existingExchange.profit += robot.profit || 0;
            }
        } else {
            newExchange.assets = [asset];
            newExchange.profit = asset.profit;
        }
        return existingExchange ? acc : [...acc, newExchange];
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
        const existingExchange = acc.find((el) => el.exchange === position.exchange);
        const newExchange = {
            exchange: position.exchange,
            profit: 0,
            assets: []
        };
        const robot = getTradingPositionData(position);
        const asset = {
            asset: position.asset,
            volume: (position.direction === "short" ? -1 : 1) * position.volume,
            profit: position.profit,
            robots: [robot]
        };
        if (existingExchange) {
            const existingAsset = existingExchange.assets.find((el) => el.asset === position.asset);
            if (!existingAsset) {
                existingExchange.assets.push(asset);
                existingExchange.profit += asset.profit;
            } else {
                existingAsset.robots.push(robot);
                existingAsset.volume = round(
                    existingAsset.volume + (robot.direction === "short" ? -1 : 1) * robot.volume,
                    6
                );
                existingAsset.profit = (existingAsset.profit || 0) + (robot.profit || 0);
                existingExchange.profit += robot.profit || 0;
            }
        } else {
            newExchange.assets = [asset];
            newExchange.profit = asset.profit;
        }
        return existingExchange ? acc : [...acc, newExchange];
    }, []) || [];
