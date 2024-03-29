import { modalType } from "./types";
import { RefObject } from "react";
import { buildRobotPositionCandlesQuery, CANDLES_FOR_BACKTEST } from "graphql/robots/queries";
import { BACKTEST_POSITION_CANDLE_SUB, buildRobotPositionCandleSubQuery } from "graphql/robots/subscriptions";
import { buildSignalPositionCandleSubQuery } from "graphql/signals/subscriptions";
import { RobotsType } from "config/types";

export const actions = ["delete", "start", "stop"];

export const getIsVisibleStatus = (
    modal: modalType,
    dataModal: { ModalVisible: { isVisible: boolean; type: string } }
) => {
    const modalOpen = {
        create: () => dataModal.ModalVisible.isVisible && dataModal.ModalVisible.type === "create",
        action: () => dataModal.ModalVisible.isVisible && actions.includes(dataModal.ModalVisible.type),
        edit: () => dataModal.ModalVisible.isVisible && dataModal.ModalVisible.type === "edit",
        subscribe: () => dataModal.ModalVisible.isVisible && dataModal.ModalVisible.type !== "unsubscribe",
        unsubscribe: () => dataModal.ModalVisible.isVisible && dataModal.ModalVisible.type === "unsubscribe"
    };

    return modalOpen[modalType[modal]]();
};

export const setStylesToRef = (ref: RefObject<HTMLInputElement>, styles: { [key: string]: string }) => {
    if (ref.current) {
        Object.assign(ref.current.style, styles);
    }
};

export async function fetchWithStatus(asyncOperation: any, setLoadingFunction: (status: boolean) => void) {
    try {
        setLoadingFunction(true);
        return await asyncOperation();
    } catch (e) {
        return { error: e.message };
    } finally {
        setLoadingFunction(false);
    }
}

export const candleQueries = (isAuth?: boolean, isAuthAndRobotOwned?: boolean) => ({
    backtest: {
        history: CANDLES_FOR_BACKTEST(),
        realTimeSub: BACKTEST_POSITION_CANDLE_SUB()
    },
    robot: {
        history: buildRobotPositionCandlesQuery(isAuth, isAuthAndRobotOwned, RobotsType.robots),
        realTimeSub: buildRobotPositionCandleSubQuery(isAuth)
    },
    signal: {
        history: buildRobotPositionCandlesQuery(isAuth, isAuthAndRobotOwned, RobotsType.signals),
        realTimeSub: buildSignalPositionCandleSubQuery(isAuth)
    }
});
