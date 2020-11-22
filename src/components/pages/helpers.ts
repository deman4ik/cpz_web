import { modalType } from "./types";
import { RefObject } from "react";
import { buildRobotPositionCandlesQuery, CANDLES_FOR_BACKTEST } from "graphql/robots/queries";
import { BACKTEST_POSITION_CANDLE_SUB, buildRobotPositionCandleSubQuery } from "graphql/robots/subscriptions";
import { buildSignalPositionCandleSubQuery } from "graphql/signals/subscriptions";

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

export const candleQueries = (timeframe: number, isAuth?: boolean, isAuthAndRobotOwned?: boolean) => ({
    backtest: {
        history: CANDLES_FOR_BACKTEST(timeframe),
        realTimeSub: BACKTEST_POSITION_CANDLE_SUB(timeframe)
    },
    robot: {
        history: buildRobotPositionCandlesQuery(timeframe, isAuth, isAuthAndRobotOwned),
        realTimeSub: buildRobotPositionCandleSubQuery(isAuth, timeframe)
    },
    signal: {
        history: buildRobotPositionCandlesQuery(timeframe, isAuth),
        realTimeSub: buildSignalPositionCandleSubQuery(isAuth, timeframe)
    }
});
