import React from "react";
//utils
import { STATUS_COLORS } from "config/constants";
import { buildRobotChartCell } from "components/pages/ManagePage/utils";
import { formatDate } from "config/utils";

export const BACKTESTS_TABLE_COLUMNS = [
    {
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
                width: 80
            },
            {
                Header: "Strategy",
                accessor: "strategy",
                isVisible: true,
                width: 120
            },
            {
                Header: "Time Frame",
                accessor: "timeframe",
                isVisible: true,
                width: 120
            },
            {
                Header: "Date From",
                accessor: (v) => formatDate(v.date_from),
                isVisible: true,
                width: 200
            },
            {
                Header: "Date To",
                accessor: (v) => formatDate(v.date_to),
                isVisible: true,
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
                accessor: (v) => `${v.completed_percent}%`,
                isVisible: true,
                width: 100
            },
            {
                Header: "Error",
                accessor: (v) => v.errors || "",
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
    },
    {
        Header: "Statistics",
        id: "statistics",
        disableSortBy: true,
        columns: [
            {
                Header: "Performance",
                accessor: "performance",
                isVisible: true,
                Cell: buildRobotChartCell,
                sortSchema: { field: "stats", subfield: "equity_avg" },
                width: 200
            },
            {
                Header: "Profit",
                accessor: "netProfit",
                isVisible: true,
                sortSchema: { field: "stats", subfield: "net_profit" },
                width: 90
            },
            {
                Header: "W/R",
                accessor: "winRate",
                isVisible: true,
                sortSchema: { field: "stats", subfield: "win_rate" },
                width: 70
            },
            {
                Header: "Max Drawdown",
                accessor: "maxDrawdown",
                isVisible: true,
                sortSchema: { field: "stats", subfield: "max_drawdown" },
                width: 125
            },
            {
                Header: "Trades",
                accessor: "tradesCount",
                isVisible: true,
                sortSchema: { field: "stats", subfield: "trades_count" },
                width: 90
            },
            {
                Header: "Rating",
                accessor: "rating",
                isVisible: true,
                sortSchema: { field: "stats", subfield: "trades_count" },
                width: 90
            },
            {
                Header: "Average Loss",
                accessor: "avgLoss",
                isVisible: true,
                sortSchema: { field: "stats", subfield: "trades_count" },
                width: 130
            },
            {
                Header: "Local Max",
                accessor: "localMax",
                isVisible: true,
                sortSchema: { field: "stats", subfield: "trades_count" },
                width: 120
            },
            {
                Header: "Loss Rate",
                accessor: "lossRate",
                isVisible: true,
                sortSchema: { field: "stats", subfield: "trades_count" },
                width: 100
            },
            {
                Header: "Average Profit",
                accessor: "avgProfit",
                isVisible: true,
                sortSchema: { field: "stats", subfield: "trades_count" },
                width: 130
            },
            {
                Header: "Gross Loss",
                accessor: "grossLoss",
                isVisible: true,
                sortSchema: { field: "stats", subfield: "trades_count" },
                width: 120
            },
            {
                Header: "Average Bars Held",
                accessor: "avgBarsHeld",
                isVisible: true,
                sortSchema: { field: "stats", subfield: "trades_count" },
                width: 180
            },
            {
                Header: "Gross Profit",
                accessor: "grossProfit",
                isVisible: true,
                sortSchema: { field: "stats", subfield: "trades_count" },
                width: 130
            },
            {
                Header: "Payoff Ration",
                accessor: "payoffRatio",
                isVisible: true,
                sortSchema: { field: "stats", subfield: "trades_count" },
                width: 130
            },
            {
                Header: "Average Net Profit",
                accessor: "avgNetProfit",
                isVisible: true,
                sortSchema: { field: "stats", subfield: "trades_count" },
                width: 150
            },
            {
                Header: "Profit Factor",
                accessor: "profitFactor",
                isVisible: true,
                sortSchema: { field: "stats", subfield: "trades_count" },
                width: 130
            },
            {
                Header: "Trades Losing",
                accessor: "tradesLosing",
                isVisible: true,
                sortSchema: { field: "stats", subfield: "trades_count" },
                width: 150
            },
            {
                Header: "Max Consecutive Wins",
                accessor: "maxConsecWins",
                isVisible: true,
                sortSchema: { field: "stats", subfield: "trades_count" },
                width: 200
            },
            {
                Header: "Max Consecutive Losses",
                accessor: "maxConsecLosses",
                isVisible: true,
                sortSchema: { field: "stats", subfield: "trades_count" },
                width: 200
            },
            {
                Header: "Max Drawdown Date",
                accessor: (v) => formatDate(v.maxDrawdownDate),
                isVisible: true,
                sortSchema: { field: "stats", subfield: "trades_count" },
                width: 180
            },
            {
                Header: "Average Profit Winners",
                accessor: "avgProfitWinners",
                isVisible: true,
                sortSchema: { field: "stats", subfield: "trades_count" },
                width: 180
            },
            {
                Header: "Average Bars Held Losing",
                accessor: "avgBarsHeldLosing",
                isVisible: true,
                sortSchema: { field: "stats", subfield: "trades_count" },
                width: 200
            },
            {
                Header: "Average Bars Held Winning",
                accessor: "avgBarsHeldWinning",
                isVisible: true,
                sortSchema: { field: "stats", subfield: "trades_count" },
                width: 200
            },
            {
                Header: "Current Win Sequence",
                accessor: "currentWinSequence",
                isVisible: true,
                sortSchema: { field: "stats", subfield: "trades_count" },
                width: 180
            },
            {
                Header: "Current Loss Sequence",
                accessor: "currentLossSequence",
                isVisible: true,
                sortSchema: { field: "stats", subfield: "trades_count" },
                width: 200
            },
            {
                Header: "Last Position Exit Date",
                accessor: (v) => formatDate(v.last_position_exit_date),
                isVisible: true,
                sortSchema: { field: "stats", subfield: "trades_count" },
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
                isVisible: true,
                width: 100
            },
            {
                Header: "Populate History",
                accessor: (v) => (v.settings.populateHistory ? "Yes" : "No"),
                isVisible: true,
                width: 150
            },
            {
                Header: "Save Logs",
                accessor: (v) => (v.settings.saveLogs ? "Yes" : "No"),
                isVisible: true,
                width: 150
            },
            {
                Header: "Save Positions",
                accessor: (v) => (v.settings.savePositions ? "Yes" : "No"),
                isVisible: true,
                width: 150
            },
            {
                Header: "Save Signals",
                accessor: (v) => (v.settings.saveSignals ? "Yes" : "No"),
                isVisible: true,
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
                isVisible: true,
                width: 262
            },
            {
                Header: "Robot Code",
                accessor: (v) => v.robot.code,
                isVisible: true,
                width: 262
            }
        ]
    }
];
