import React from "react";

import SignalRobotTradingTab from "components/pages/SignalRobotPage/TradingTab";
import TradingRobotTradingTab from "components/pages/TradingRobotPage/TradingTab";
import { RobotsType } from "config/types";

type Props = {
    type: RobotsType;
    tradingData: any;
    robotData: any;
    width: number;
};

const TradingTab = ({ type, tradingData, robotData, width }: Props): JSX.Element => {
    const typeIsSignals = type === RobotsType.signals;

    return typeIsSignals ? (
        <SignalRobotTradingTab tradingData={tradingData} robotData={robotData} width={width} />
    ) : (
        <TradingRobotTradingTab tradingData={tradingData} robotData={robotData} width={width} />
    );
};

export default TradingTab;
