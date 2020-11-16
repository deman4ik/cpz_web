import React from "react";
//utils
import { STATUS_COLORS } from "config/constants";
import { buildRobotChartCell } from "components/pages/ManagePage/utils";
import { formatDate } from "config/utils";
import { StrategySettingsItem } from "components/pages/ManagePage/backtests/StrategySettingsItem";

export const BACKTESTS_TABLE_COLUMNS = [
    {
        Header: "Back Test Info",
        id: "backtest_info",
        disableSortBy: false,
        columns: [
            {
                Header: "ID",
                accessor: "id",
                width: 200
            },
            {
                Header: "Exchange",
                accessor: "exchange",
                width: 100
            },
            {
                Header: "Asset",
                accessor: "asset",
                width: 80
            },
            {
                Header: "Currency",
                accessor: "currency",
                width: 80
            },
            {
                Header: "Strategy",
                accessor: "strategy",
                width: 120
            },
            {
                Header: "Time Frame",
                accessor: "timeframe",
                width: 120
            },
            {
                Header: "Date From",
                accessor: (v) => formatDate(v.date_from),
                width: 200
            },
            {
                Header: "Date To",
                accessor: (v) => formatDate(v.date_to),
                width: 200
            }
        ]
    },
    {
        Header: "Status",
        id: "backtest_status",
        disableSortBy: true,
        columns: [
            {
                Header: "Total Bars",
                accessor: "total_bars",
                width: 100
            },
            {
                Header: "Left Bars",
                accessor: "left_bars",
                width: 100
            },
            {
                Header: "Processed Bars",
                accessor: "processed_bars",
                width: 150
            },
            {
                Header: "Completed",
                accessor: (v) => `${v.completed_percent}%`,
                width: 100
            },
            {
                Header: "Error",
                accessor: (v) => v.errors || "",
                width: 100
            },
            {
                Header: "Status",
                accessor: "status",
                Cell: ({ value }: { value: number }): JSX.Element => (
                    <div style={{ color: STATUS_COLORS[value] }}>{value}</div>
                ),
                width: 100
            }
        ]
    },
    {
        Header: "Statistics",
        id: "statistics",
        disableSortBy: true,
        columns: [
            {
                Header: "Performance",
                accessor: "performance",
                Cell: buildRobotChartCell,
                fieldSchema: { field: "stats", subfield: "equity_avg" },
                width: 200
            },
            {
                Header: "Profit",
                accessor: "netProfit",
                fieldSchema: { field: "stats", subfield: "net_profit" },
                width: 90
            },
            {
                Header: "W/R",
                accessor: "winRate",
                fieldSchema: { field: "stats", subfield: "win_rate" },
                width: 70
            },
            {
                Header: "Max Drawdown",
                accessor: "maxDrawdown",
                fieldSchema: { field: "stats", subfield: "max_drawdown" },
                width: 125
            },
            {
                Header: "Trades",
                accessor: "tradesCount",
                fieldSchema: { field: "stats", subfield: "trades_count" },
                width: 90
            },
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
    {
        Header: "Settings",
        id: "settings",
        disableSortBy: true,
        columns: [
            {
                Header: "Local",
                accessor: (v) => (v.settings.local ? "Yes" : "No"),
                width: 100
            },
            {
                Header: "Populate History",
                accessor: (v) => (v.settings.populateHistory ? "Yes" : "No"),
                width: 150
            },
            {
                Header: "Save Logs",
                accessor: (v) => (v.settings.saveLogs ? "Yes" : "No"),
                width: 150
            },
            {
                Header: "Save Positions",
                accessor: (v) => (v.settings.savePositions ? "Yes" : "No"),
                width: 150
            },
            {
                Header: "Save Signals",
                accessor: (v) => (v.settings.saveSignals ? "Yes" : "No"),
                width: 150
            }
        ]
    },
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
    {
        Header: "Robot Settings",
        id: "robot_settings",
        disableSortBy: false,
        columns: [
            {
                Header: "Volume",
                accessor: (v) => v.robot.robot_settings?.volume,
                width: 80
            },
            {
                Header: "Volume Type",
                accessor: (v) => v.robot.robot_settings?.volumeType,
                width: 120
            },
            {
                Header: "Strategy Settings",
                accessor: (v) => v.robot.strategy_settings,
                Cell: ({ value }: { value: any }): JSX.Element => <StrategySettingsItem value={value} />,
                width: 250
            }
        ]
    }
];
