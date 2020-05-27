import { globalAny } from "config/constants"; // констната глобал для обращения к localStorage

/**
 * Сервис работы с localStorage
 * @private storage - локал сторадж хранилище
 */
class LocalStorageService {
    private storage: any;

    constructor() {
        this.storage = globalAny.localStorage;
    }

    /**
     * Метод записи в хранилище
     * @param items {localStorageItems} - массив элементов для записи
     * @return void
     */
    writeItems = (items: localStorageItems): void => {
        items.forEach(({ key, value }: localStorageItem): void => {
            this.storage[key] = value;
        });
    };

    /**
     * Метод получения элементов
     * @param keys {Array<string>} - массив ключей
     * @param type {string} - тип возвращаемого объекта
     * @return {array | object} -  массив элементов или объект элементов
     */
    getItems = (keys: Array<string>, type?: string): any => {
        if (type === "object") {
            const result = {};
            keys.forEach((key: string) => (result[key] = this.storage?.getItem(key)));
            return result;
        }
        return keys.map((key: string) => ({ [key]: this.storage?.getItem(key) }));
    };

    /**
     * Функция отчистки из localStorage
     * @param keys -  массив ключей
     */
    clearItems = (keys: Array<string>): void => {
        const itemsObj = this.getItems(keys, "object");
        keys.forEach((key) => {
            if (itemsObj[key]) this.storage.removeItem(key);
        });
    };

    /**
     * Метод получения элемента из хранилища по ключу
     * @param key{string}
     * @return {number | string | null}
     */
    getItem = (key: string): number | string | null => this.storage?.getItem(key);
}

/* types */
type localStorageItem = {
    key: string;
    value: string | number;
};
type localStorageItems = Array<localStorageItem | null>;

export default new LocalStorageService();
