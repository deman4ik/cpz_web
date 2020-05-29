/**
 * Задержка вызова
 * @param {function} callback передаваемый коллбэк
 * @param {number} delay задержка в мс
 */
const debounce = (callback: any, delay: number): void => {
    let timeout;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        callback();
    }, delay);
};

export default debounce;
