import { useQuery } from "@apollo/react-hooks";
import dayjs from "dayjs";
// graphql
import { GET_USER_STATS_DURING_PERIOD } from "graphql/manage/queries";

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
        const { data, error } = useQuery(GET_USER_STATS_DURING_PERIOD, {
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
    const now = dayjs(); // current date
    /*Timestamps periods*/
    const today = { name: "today", period: now.format(format) };
    const dayAgo = { name: "dayAgo", period: now.subtract(1, "day").format(format) };
    const weekAgo = { name: "weekAgo", period: now.subtract(7, "day").format(format) };
    const monthAgo = { name: "monthAgo", period: now.subtract(1, "month").format(format) };
    const periodsArray = [today, dayAgo, weekAgo, monthAgo];

    const fetchedPeriods = fetchPeriods(periodsArray);

    /*wait all periods*/
    if (fetchedPeriods.filter((item) => item !== null).length === periodsArray.length) {
        return fetchedPeriods;
    }

    return null;
};

export default useFetchTimestamp;
