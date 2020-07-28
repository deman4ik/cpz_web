export const ROBOTS_TITLES_SCHEME = {
    info: {
        title: "Info",
        name: "Name: ",
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
        requiredHistoryMaxBars: "Max bars: "
    },
    performance: {
        title: "Performance"
    },
    statistics: {
        title: "Statistics",
        stats: {
            profit: "Profit: ",
            winRate: "Win Rate: ",
            maxDrawdown: "Max Drawdon: ",
            tradesCount: "Trades count: "
        }
    },
    available: {
        title: "Available"
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

export const COLUMNS_WIDTH = ["18.4%", "14%", "14.2%", "14.2%", "10.2%", "14.2%", "14.2%"];

/*HEAD TITLES*/
export const ROBOTS_TABLE_HEADER_DATA = Object.keys(ROBOTS_TITLES_SCHEME).map((key) => ({
    text: ROBOTS_TITLES_SCHEME[key].title
}));
