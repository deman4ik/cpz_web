// utils
import { formatDate } from "config/utils";
import formatHtmlString from "utils/formatHtmlString";
/**
 * Утилита форматирования сообщений
 */
const formatMessage = (data: any) => {
    return data.map(({ data: { message }, timestamp, to }) => {
        const type = !to ? "out" : "in";
        const date = formatDate(timestamp);
        return { message: formatHtmlString(message), type, date };
    });
};

export default formatMessage;
