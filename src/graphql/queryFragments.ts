export const stats = `
stats {
    tradesCount: trades_count
    maxDrawdown: max_drawdown
    winRate: win_rate
    profit: net_profit
    equity: equity_avg
}`;

export const fullStats = `
fullStats: stats {
    profit: net_profit
    equity: equity_avg
    statistics: full_stats
}
`;
