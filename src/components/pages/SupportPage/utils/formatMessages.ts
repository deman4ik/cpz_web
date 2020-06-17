// utils
import { formatDate } from "config/utils";

/**
 * Утилита форматирования сообщений
 */
const formatMessage = (data: any) => {
    return data.map(({ data: { message }, timestamp, to }) => {
        const type = !to ? "out" : "in";
        const date = formatDate(timestamp);

        return { message: { __html: message.replace(/(\r\n|\n|\r)/gm, "<br />") }, type, date };
    });
};

export default formatMessage;
