// services
import LocalStorageService from "services/localStorageService";

/**
 * Хелпер для обрабтки значения поиска из localStorage
 * @param key - ключ для значение в storage
 */
const getSearchFromStorage: getSearchFromStorageSignature = (key) => {
    const storageData: any = LocalStorageService.getItem(`${key}_filters`);
    if (storageData) {
        const parsedData = JSON.parse(storageData);

        const filters = parsedData?.filters && JSON.parse(parsedData.filters);

        if (filters?.name?._ilike) return filters.name._ilike.slice(1, -1);
    }
    return "";
};
type getSearchFromStorageSignature = (key: string) => string;

export default getSearchFromStorage;
