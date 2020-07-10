// for test
import RobotsNotDesktopView from "components/pages/ManagePage/robots/components/RobotsNotDesktopView";
import RobotCellText from "../components/RobotCellText";

export const ROBOTS_TITLES_SCHEME = {
    info: {
        title: "Info",
        code: "Code: ",
        id: "ID: ",
        status: "Status: "
    },
    settings: {
        title: "Settings",
        volume: "Volume: ",
        strategyParameters: {
            smaSize: "Sma Size: ",
            distInit: "Dist Init: ",
            lookback: "Look Back: ",
            atrPeriod: "After Period: ",
            adjustment: "Adjustment: ",
            adxHigh: "Adx High: ",
            adxPeriod: "Adx Period: ",
            trailBars: "Trail Bars: ",
            adx: "Adx: ",
            tick: "Tick: ",
            ratio: "Ratio: ",
            seriesSize: "Series Size: ",
            orderStopLoss: "Order Stop Loss: ",
            orderTakeProfit: "OrderTakeProfit: "
        },
        requiredHistoryMaxBars: "HistoryMaxBars"
    },
    statistics: {
        title: "Statistics"
    },
    types: {
        title: "Types"
    },
    entries: {
        title: "Entries",
        user_robots: "Robots: ",
        user_signals: "Signals: "
    }
};

export const COLUMNS_WIDTH = ["20%", "20%", "30%", "15%", "15%"];

/*HEAD TITLES*/
export const ROBOTS_TABLE_HEADER_DATA = Object.keys(ROBOTS_TITLES_SCHEME).map((key) => ({
    text: ROBOTS_TITLES_SCHEME[key].title
}));

/*fake rows for visual test*/
export const FAKE_ROWS = [
    {
        NotDesktopView: RobotsNotDesktopView,
        cells: [
            {
                component: (
                    <RobotCellText>
                        <p>
                            <span>{ROBOTS_TITLES_SCHEME.info.id}</span> d8d12e73-7681-401f-b873-2ae23cefe409
                        </p>
                        <p>
                            <span>{ROBOTS_TITLES_SCHEME.info.code}</span> BR_1_Binance_Fut_XRP_USD_1d
                        </p>
                        <p>
                            <span>{ROBOTS_TITLES_SCHEME.info.status}</span> stopped
                        </p>
                    </RobotCellText>
                ),
                notDesktopVal: "Info",
                title: ROBOTS_TITLES_SCHEME.info.title
            },
            {
                component: (
                    <RobotCellText>
                        <p>
                            <span>{ROBOTS_TITLES_SCHEME.settings.volume}</span> 3.5
                        </p>
                        <p>
                            <span>{ROBOTS_TITLES_SCHEME.settings.strategyParameters.smaSize}</span> 150
                        </p>
                        <p>
                            <span>{ROBOTS_TITLES_SCHEME.settings.strategyParameters.distInit}</span> 2
                        </p>
                        <p>
                            <span>{ROBOTS_TITLES_SCHEME.settings.strategyParameters.lookback}</span> 20
                        </p>
                        <p>
                            <span>{ROBOTS_TITLES_SCHEME.settings.strategyParameters.atrPeriod}</span> 30
                        </p>
                        <p>
                            <span>{ROBOTS_TITLES_SCHEME.settings.strategyParameters.adjustment}</span> 0.22
                        </p>
                    </RobotCellText>
                ),
                notDesktopVal: "Settings here",
                title: ROBOTS_TITLES_SCHEME.settings.title
            },
            {
                component: "statistics here",
                notDesktopVal: "statistics here",
                title: ROBOTS_TITLES_SCHEME.statistics.title
            },
            {
                component: <RobotCellText>Signals | Robots</RobotCellText>,
                notDesktopVal: "types here",
                title: ROBOTS_TITLES_SCHEME.types.title
            },
            {
                component: (
                    <RobotCellText>
                        <p>
                            <span>{ROBOTS_TITLES_SCHEME.entries.user_robots}</span> 15
                        </p>
                        <p>
                            <span>{ROBOTS_TITLES_SCHEME.entries.user_signals}</span> 16
                        </p>
                    </RobotCellText>
                ),
                notDesktopVal: "entries here",
                title: ROBOTS_TITLES_SCHEME.entries.title
            }
        ]
    }
];
