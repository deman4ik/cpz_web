import { useQuery } from "@apollo/client";
import dayjs from "dayjs";
// graphql
import { GET_NEW_USERS_IN_PEROID } from "graphql/manage/queries";

export interface periodInteface {
    name: string;
    periodFrom: string;
    periodTo: string;
}
export interface dataInterface {
    name: string;
    data: Array<any> | "error" | null;
}

/**
 * Функция фетчинга данных
 */
const fetchPeriods = (periodsArray: Array<periodInteface>) => {
    return periodsArray.map(({ periodFrom, periodTo, name }) => {
        const { data, error } = useQuery(GET_NEW_USERS_IN_PEROID, {
            variables: { periodFrom, periodTo }
        });
        /*Усолвная обработка*/
        if (data) {
            return { name, data: data.users_aggregate.aggregate.count };
        }
        if (error) {
            return { name, data: "error" };
        }
        return null;
    });
};

/**
 * Hook зарегестрированных юзеров по периодам
 */
const useFetchTimestamp = (): Array<dataInterface> | null => {
    const now = dayjs.utc(); // current date
    /*Timestamps periods*/
    const today = {
        name: "today",
        periodFrom: now.startOf("day").toISOString(),
        periodTo: now.endOf("day").toISOString()
    };
    const dayAgo = {
        name: "dayAgo",
        periodFrom: now.startOf("day").add(-1, "day").toISOString(),
        periodTo: now.endOf("day").add(-1, "day").toISOString()
    };
    const weekAgo = {
        name: "weekAgo",
        periodFrom: now.startOf("isoWeek").toISOString(),
        periodTo: now.endOf("isoWeek").toISOString()
    };
    const monthAgo = {
        name: "monthAgo",
        periodFrom: now.startOf("month").toISOString(),
        periodTo: now.endOf("month").toISOString()
    };
    const periodsArray = [today, dayAgo, weekAgo, monthAgo];

    const fetchedPeriods = fetchPeriods(periodsArray);

    /*wait all periods*/
    if (fetchedPeriods.filter((item) => item !== null).length === periodsArray.length) {
        return fetchedPeriods;
    }

    return null;
};

export default useFetchTimestamp;
