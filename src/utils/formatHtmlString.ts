/**
 * Утилита форматирования htmlString для реакт компонентов
 * @param htmlString - строка с html
 */
const formatHtmlString = (htmlString: string): { __html: string } => ({
    __html: htmlString.replace(/(\r\n|\n|\r)/gm, "<br />")
});

export default formatHtmlString;
