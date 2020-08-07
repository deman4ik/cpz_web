/**
 * Утилита форматирования htmlString для реакт компонентов
 * @param htmlString - строка с html
 * @param  replacer - символ на который будет заменен символ переноса строки (необязательный параметр)
 */
const formatHtmlString = (htmlString: string, replacer = "<br>"): { __html: string } => ({
    __html: htmlString.replace(/(\r\n|\n|\r)/gm, replacer)
});

export default formatHtmlString;
