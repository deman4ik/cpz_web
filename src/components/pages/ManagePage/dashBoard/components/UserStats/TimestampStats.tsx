import React from "react";
// hooks
import useFetchTimestamp from "components/pages/ManagePage/dashBoard/hooks/useFetchTimestamp";
// utils
import { formatPeriodUsers } from "components/pages/ManagePage/dashBoard/utils";
// components
import StatsContainer from "./StatsContainer";

/**
 *  Компонент отоюражения пользователей за определенные периоды
 */
const TimestampStats: React.FC = () => {
    const timeStampsPeriods = useFetchTimestamp(); // хук фетчинга периодов
    return timeStampsPeriods && <StatsContainer title="New users" data={formatPeriodUsers(timeStampsPeriods)} />;
};

export default TimestampStats;
