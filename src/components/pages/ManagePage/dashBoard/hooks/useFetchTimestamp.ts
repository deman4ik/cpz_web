import { useQuery } from "@apollo/client";
import dayjs from "dayjs";
// graphql
import { GET_NEW_USERS_IN_PEROID } from "graphql/manage/queries";

/*additional*/
const format = "YYYY-MM-DD";

export interface periodInteface {
    name: string;
    period: string;
}
export interface dataInterface {
    name: string;
    data: Array<any> | "error" | null;
}

/**
 * Функция фетчинга данных
 */
const fetchPeriods = (periodsArray: Array<periodInteface>) => {
    return periodsArray.map(({ period, name }) => {
        const { data, error } = useQuery(GET_NEW_USERS_IN_PEROID, {
            variables: { period }
        });
        /*Усолвная обработка*/
        if (data) {
            return { name, data: data.users };
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
    const today = { name: "today", period: now.startOf("day").format(format) };
    const dayAgo = { name: "dayAgo", period: now.startOf("day").add(-1, "day").format(format) };
    const weekAgo = { name: "weekAgo", period: now.startOf("isoWeek").format(format) };
    const monthAgo = { name: "monthAgo", period: now.startOf("month").format(format) };
    const periodsArray = [today, dayAgo, weekAgo, monthAgo];

    const fetchedPeriods = fetchPeriods(periodsArray);

    /*wait all periods*/
    if (fetchedPeriods.filter((item) => item !== null).length === periodsArray.length) {
        return fetchedPeriods;
    }

    return null;
};

export default useFetchTimestamp;
