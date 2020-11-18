import React from "react";
//utils
import { STATUS_COLORS } from "config/constants";
import { buildRobotChartCell } from "components/pages/ManagePage/utils";
import { formatDate } from "config/utils";
import { DynamicDataCell } from "components/pages/ManagePage/backtests/DynamicDataCell";
import { titleFromLowerCase } from "components/pages/ManagePage/backtests/utils";

export const backTestInfoColumns = {
    Header: "Back Test Info",
    id: "backtest_info",
    disableSortBy: false,
    columns: [
        {
            Header: "ID",
            accessor: "id",
            isVisible: true,
            width: 200
        },
        {
            Header: "Exchange",
            accessor: "exchange",
            isVisible: true,
            width: 100
        },
        {
            Header: "Asset",
            accessor: "asset",
            isVisible: true,
            width: 80
        },
        {
            Header: "Currency",
            accessor: "currency",
            isVisible: true,
            width: 100
        },
        {
            Header: "Strategy",
            accessor: "strategy",
            isVisible: true,
            width: 100
        },
        {
            Header: "Time Frame",
            accessor: "timeframe",
            isVisible: true,
            width: 120
        },
        {
            Header: "Date From",
            accessor: "date_from",
            isVisible: true,
            Cell: ({ value }: { value: string }) => formatDate(value),
            width: 200
        },
        {
            Header: "Date To",
            accessor: "date_to",
            Cell: ({ value }: { value: string }) => formatDate(value),
            isVisible: true,
            width: 200
        }
    ]
};
export const backTestStatusColumns = {
    Header: "Status",
    id: "backtest_status",
    disableSortBy: true,
    columns: [
        {
            Header: "Total Bars",
            accessor: "total_bars",
            isVisible: true,
            width: 100
        },
        {
            Header: "Left Bars",
            accessor: "left_bars",
            isVisible: true,
            width: 100
        },
        {
            Header: "Processed Bars",
            accessor: "processed_bars",
            isVisible: true,
            width: 150
        },
        {
            Header: "Completed",
            accessor: "completed_percent",
            Cell: ({ value }: { value: string }) => `${value} %`,
            isVisible: true,
            width: 100
        },
        {
            Header: "Error",
            accessor: "errors",
            isVisible: true,
            width: 100
        },
        {
            Header: "Status",
            accessor: "status",
            isVisible: true,
            Cell: ({ value }: { value: number }): JSX.Element => (
                <div style={{ color: STATUS_COLORS[value] }}>{value}</div>
            ),
            width: 100
        }
    ]
};
export const settingsColumns = {
    Header: "Settings",
    id: "settings",
    disableSortBy: true,
    columns: [
        {
            Header: "Local",
            accessor: (v) => v.settings.local,
            isVisible: true,
            width: 100
        },
        {
            Header: "Populate History",
            accessor: (v) => v.settings.populateHistory,
            isVisible: true,
            width: 150
        },
        {
            Header: "Save Logs",
            accessor: (v) => v.settings.saveLogs,
            isVisible: true,
            width: 150
        },
        {
            Header: "Save Positions",
            accessor: (v) => v.settings.savePositions,
            isVisible: true,
            width: 150
        },
        {
            Header: "Save Signals",
            accessor: (v) => v.settings.saveSignals,
            isVisible: true,
            width: 150
        }
    ]
};
const robotStatsColumns = (widths: number[] = []) => {
    return [
        {
            Header: "Performance",
            accessor: "performance",
            isVisible: true,
            Cell: buildRobotChartCell,
            sortSchema: { field: "stats", subfield: "equity_avg" },
            width: widths[0] || 200
        },
        {
            Header: "Profit",
            accessor: "netProfit",
            isVisible: true,
            sortSchema: { field: "stats", subfield: "net_profit" },
            width: widths[1] || 90
        },
        {
            Header: "W/R",
            accessor: "winRate",
            isVisible: true,
            sortSchema: { field: "stats", subfield: "win_rate" },
            width: widths[2] || 70
        },
        {
            Header: "Max Drawdown",
            accessor: "maxDrawdown",
            isVisible: true,
            sortSchema: { field: "stats", subfield: "max_drawdown" },
            width: widths[3] || 125
        },
        {
            Header: "Trades",
            accessor: "tradesCount",
            isVisible: true,
            sortSchema: { field: "stats", subfield: "trades_count" },
            width: widths[4] || 90
        }
    ];
};
const robotSettings = {
    Header: "Robot Settings",
    id: "robot_settings",
    disableSortBy: false,
    columns: [
        {
            Header: "Volume",
            accessor: (v) => v.robot.robot_settings?.volume,
            isVisible: true,
            width: 80
        },
        {
            Header: "Volume Type",
            accessor: (v) => v.robot.robot_settings?.volumeType,
            isVisible: true,
            width: 120
        },
        {
            Header: "Strategy Settings",
            accessor: (v) => v.robot.strategy_settings,
            isVisible: true,
            Cell: ({ value }: { value: any }): JSX.Element => <DynamicDataCell value={value} />,
            width: 250
        }
    ]
};
export const BACKTESTS_TABLE_COLUMNS = [
    backTestInfoColumns,
    backTestStatusColumns,
    {
        Header: "Statistics",
        id: "statistics",
        disableSortBy: true,
        columns: [
            ...robotStatsColumns(),
            {
                Header: "Rating",
                accessor: "rating",
                fieldSchema: { field: "stats", subfield: "trades_count" },
                width: 90
            },
            {
                Header: "Average Loss",
                accessor: "avgLoss",
                fieldSchema: { field: "stats", subfield: "trades_count" },
                width: 130
            },
            {
                Header: "Local Max",
                accessor: "localMax",
                fieldSchema: { field: "stats", subfield: "trades_count" },
                width: 120
            },
            {
                Header: "Loss Rate",
                accessor: "lossRate",
                fieldSchema: { field: "stats", subfield: "trades_count" },
                width: 100
            },
            {
                Header: "Average Profit",
                accessor: "avgProfit",
                fieldSchema: { field: "stats", subfield: "trades_count" },
                width: 130
            },
            {
                Header: "Gross Loss",
                accessor: "grossLoss",
                fieldSchema: { field: "stats", subfield: "trades_count" },
                width: 120
            },
            {
                Header: "Average Bars Held",
                accessor: "avgBarsHeld",
                fieldSchema: { field: "stats", subfield: "trades_count" },
                width: 180
            },
            {
                Header: "Gross Profit",
                accessor: "grossProfit",
                fieldSchema: { field: "stats", subfield: "trades_count" },
                width: 130
            },
            {
                Header: "Payoff Ration",
                accessor: "payoffRatio",
                fieldSchema: { field: "stats", subfield: "trades_count" },
                width: 130
            },
            {
                Header: "Average Net Profit",
                accessor: "avgNetProfit",
                fieldSchema: { field: "stats", subfield: "trades_count" },
                width: 150
            },
            {
                Header: "Profit Factor",
                accessor: "profitFactor",
                fieldSchema: { field: "stats", subfield: "trades_count" },
                width: 130
            },
            {
                Header: "Trades Losing",
                accessor: "tradesLosing",
                fieldSchema: { field: "stats", subfield: "trades_count" },
                width: 150
            },
            {
                Header: "Max Consecutive Wins",
                accessor: "maxConsecWins",
                fieldSchema: { field: "stats", subfield: "trades_count" },
                width: 200
            },
            {
                Header: "Max Consecutive Losses",
                accessor: "maxConsecLosses",
                fieldSchema: { field: "stats", subfield: "trades_count" },
                width: 200
            },
            {
                Header: "Max Drawdown Date",
                accessor: (v) => formatDate(v.maxDrawdownDate),
                fieldSchema: { field: "stats", subfield: "trades_count" },
                width: 180
            },
            {
                Header: "Average Profit Winners",
                accessor: "avgProfitWinners",
                fieldSchema: { field: "stats", subfield: "trades_count" },
                width: 180
            },
            {
                Header: "Average Bars Held Losing",
                accessor: "avgBarsHeldLosing",
                fieldSchema: { field: "stats", subfield: "trades_count" },
                width: 200
            },
            {
                Header: "Average Bars Held Winning",
                accessor: "avgBarsHeldWinning",
                fieldSchema: { field: "stats", subfield: "trades_count" },
                width: 200
            },
            {
                Header: "Current Win Sequence",
                accessor: "currentWinSequence",
                fieldSchema: { field: "stats", subfield: "trades_count" },
                width: 180
            },
            {
                Header: "Current Loss Sequence",
                accessor: "currentLossSequence",
                fieldSchema: { field: "stats", subfield: "trades_count" },
                width: 200
            },
            {
                Header: "Last Position Exit Date",
                accessor: (v) => formatDate(v.last_position_exit_date),
                fieldSchema: { field: "stats", subfield: "trades_count" },
                width: 250
            }
        ]
    },
    settingsColumns,
    {
        Header: "Robot Info",
        id: "robot_info",
        disableSortBy: false,
        columns: [
            {
                Header: "Robot ID",
                accessor: "robot_id",
                width: 262
            },
            {
                Header: "Robot Code",
                accessor: (v) => v.robot.code,
                width: 262
            }
        ]
    },
    robotSettings
];

export const BACKTEST_ITEM_TABLE_COLUMNS = (width: number) => {
    const firstColumnWidth = 300;
    const lastColumnWidth = 350;
    const restColumnsCount = 5;
    let restColumnsWidths = (width - (firstColumnWidth + lastColumnWidth)) / restColumnsCount;
    if (restColumnsWidths < 100) restColumnsWidths = 100;
    const widthsArr = Array.from({ length: restColumnsCount }, () => restColumnsWidths);
    return [
        {
            Header: "Robot Info",
            id: "robot_info",
            disableSortBy: false,
            columns: [
                {
                    Header: "Robot ID",
                    accessor: "robot_id",
                    isVisible: true,
                    width: firstColumnWidth
                }
            ]
        },
        {
            Header: "Statistics",
            id: "statistics",
            disableSortBy: true,
            columns: [
                ...robotStatsColumns(widthsArr),
                {
                    Header: "Strategy Settings",
                    accessor: (v) => v.backtest_settings?.strategy_settings,
                    isVisible: true,
                    width: lastColumnWidth,
                    Cell: ({ value }: { value: any }): JSX.Element => <DynamicDataCell value={value} />
                }
            ]
        }
    ];
};

export const BackSettingsTableColumns = [
    {
        Header: "Robot Settings",
        id: "robot_settings",
        disableSortBy: false,
        columns: [
            {
                Header: "Active From",
                accessor: "active_from",
                width: "100%",
                Cell: ({ value }: { value: string }) => formatDate(value),
                isVisible: true
            },
            {
                Header: "Volume",
                width: "100%",
                accessor: (v) => v.robot_settings.volume,
                isVisible: true
            },
            {
                Header: "Volume Type",
                width: "100%",
                accessor: (v) => v.robot_settings.volumeType,
                isVisible: true
            },
            {
                Header: "Strategy Settings",
                width: "100%",
                accessor: (v) => v.strategy_settings,
                isVisible: true,
                Cell: ({ value }: { value: any }): JSX.Element => <DynamicDataCell value={value} />
            }
        ]
    }
];

const backtest_signal_columns = [
    "id",
    "action",
    "candle_timestamp",
    "created_at",
    "order_type",
    "position_id",
    "position_code",
    "position_prefix",
    "price",
    "robot_id",
    "type",
    "updated_at"
];
export const BACKTEST_SIGNALS_COLUMNS = () => [
    {
        Header: "Back Test Signals",
        id: "backtest_signals",
        disableSortBy: false,
        columns: backtest_signal_columns.map((id) => ({
            Header: titleFromLowerCase(id),
            accessor: id,
            width: "100%",
            Cell: ({ value }: { value: string }) => (id.indexOf("_at") >= 0 ? formatDate(value) : value),
            isVisible: true
        }))
    }
];
const logs_columns = ["backtest_id", "candle_timestamp", "created_at", "id", "robot_id", "updated_at"];

export const getLogsColumns = () => [
    {
        Header: "Logs Info",
        id: "logs_info",
        disableSortBy: false,
        columns: logs_columns.map((id) => ({
            Header: titleFromLowerCase(id),
            accessor: id,
            width: "100%",
            Cell: ({ value }: { value: string }) => (id.indexOf("_at") >= 0 ? formatDate(value) : value),
            isVisible: true
        }))
    },
    {
        Header: "Logs Data",
        id: "logs_data",
        disableSortBy: false,
        columns: [
            {
                Header: "Logs Data",
                accessor: "data",
                width: "100%",
                Cell: ({ value }: { value: any }): JSX.Element => <DynamicDataCell value={value} />,
                isVisible: true
            }
        ]
    }
];
