const globalAny: any = global; // констната глобал для обращения к window

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
     * @param items {Array<>string>} - массив элементов названия
     * @param type {string} - тип возвращаемого объекта
     * @return {array | object} -  массив элементов или объект элементов
     */
    getItems = (items: Array<string>, type?: string): any => {
        if (type === "object") {
            const result = {};
            items.forEach((key: string) => (result[key] = this.storage?.getItem(key)));
            return result;
        }
        return items.map((key: string) => ({ [key]: this.storage?.getItem(key) }));
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
