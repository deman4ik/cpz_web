import { formatMoney, formatDate, capitalize } from "config/utils";

export const tableHeaders = ["", "All Trades", "Long Trades", "Short Trades"];

const formatAsDates = (row) => ({
    all: row.all ? formatDate(row.all) : "-",
    long: row.long ? formatDate(row.long) : "-",
    short: row.short ? formatDate(row.short) : "-"
});

const propsToNull = (obj) => Object.keys(obj).reduce((acc, key) => ({ ...acc, [key]: obj[key] || "-" }), {});

const propsToMoney = (obj) =>
    Object.keys(obj).reduce(
        (acc, key) => ({ ...acc, [key]: obj[key] || obj[key] === 0 ? `${formatMoney(obj[key])} $` : "-" }),
        {}
    );

const propsToPercent = (obj) =>
    Object.keys(obj).reduce((acc, key) => ({ ...acc, [key]: obj[key] || obj[key] === 0 ? `${obj[key]} %` : "-" }), {});

export const getRobotStatistic = (robotStatistic) =>
    !robotStatistic
        ? null
        : {
              profit: [
                  {
                      title: "Net Profit",
                      key: "netProfit",
                      ...propsToMoney(robotStatistic.netProfit)
                  },
                  {
                      title: "Number of Trades",
                      key: "tradesCount",
                      ...robotStatistic.tradesCount
                  },
                  {
                      title: "Average Profit",
                      key: "avgProfit",
                      ...propsToMoney(robotStatistic.avgNetProfit)
                  },
                  {
                      title: "Average Bars Held",
                      key: "avgBarsHeld",
                      ...propsToNull(robotStatistic.avgBarsHeld)
                  },
                  {
                      title: "Profit Factor",
                      key: "profitFactor",
                      ...propsToNull(robotStatistic.profitFactor)
                  },
                  {
                      title: "Recovery Factor",
                      key: "recoveryFactor",
                      ...propsToNull(robotStatistic.recoveryFactor)
                  },
                  {
                      title: "Payoff Ratio",
                      key: "payoffRatio",
                      ...propsToNull(robotStatistic.payoffRatio)
                  },
                  {
                      title: "Maximum Drawdown",
                      key: "maxDrawdown",
                      ...propsToMoney(robotStatistic.maxDrawdown)
                  },
                  {
                      title: "Maximum Drawdown Date",
                      key: "maxDrawdownDate",
                      ...formatAsDates(robotStatistic.maxDrawdownDate)
                  }
              ],
              winners: [
                  {
                      title: "Win Rate",
                      key: "winRate",
                      ...propsToPercent(robotStatistic.winRate)
                  },
                  {
                      title: "Gross Profit",
                      key: "grossProfit",
                      ...propsToMoney(robotStatistic.grossProfit)
                  },
                  {
                      title: "Average Profit",
                      key: "avgProfit",
                      ...propsToMoney(robotStatistic.avgProfit)
                  },
                  {
                      title: "Average Bars Held",
                      key: "avgBarsHeld",
                      ...propsToNull(robotStatistic.avgBarsHeldWinning)
                  },
                  {
                      title: "Max. Consecutive Winners",
                      key: "maxConnsecWins",
                      ...propsToNull(robotStatistic.maxConsecWins)
                  }
              ],
              losses: [
                  {
                      title: "Loss Rate",
                      key: "lossRate",
                      ...propsToPercent(robotStatistic.lossRate)
                  },
                  {
                      title: "Gross Loss",
                      key: "grossLoss",
                      ...propsToMoney(robotStatistic.grossLoss)
                  },
                  {
                      title: "Average Loss",
                      key: "avgLoss",
                      ...propsToMoney(robotStatistic.avgLoss)
                  },
                  {
                      title: "Average Bars Held",
                      key: "avgBarsHeld",
                      ...propsToNull(robotStatistic.avgBarsHeldLosing)
                  },
                  {
                      title: "Max. Consecutive Losses",
                      key: "maxConsecLosses",
                      ...propsToNull(robotStatistic.maxConsecLosses)
                  }
              ]
          };

export const getCardTitle = (item, subtitle) =>
    `${item.title}${item.key === "avgBarsHeld" && subtitle !== "profit" ? ` ${capitalize(subtitle)}` : ""}`;
