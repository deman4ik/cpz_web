/**
 * Задержка вызова
 * @param {function} callback передаваемый коллбэк
 * @param {number} delay задержка в мс
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const debounce = (callback: any, delay: number): void => {
    let timeout;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        callback();
    }, delay);
};

export default debounce;
