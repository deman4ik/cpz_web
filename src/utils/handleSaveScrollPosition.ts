// utils
import debounce from "./debounce";
// services
import LocalStorageService from "services/localStorageService";
import WindowScrollService from "services/WindowScrollService";
/**
 * Утилита записи позиции скролла в localStorage на определенных разделах
 * @param key  - название текущего раздела или ключ
 * @param delay -  задержка в мс
 */
const handleSaveScrollPosition: handleScrollSignature = (key, delay = 300) => {
    debounce(() => {
        LocalStorageService.writeItems([
            {
                key: `${key}_scroll`,
                value: JSON.stringify(WindowScrollService.getScrollPositions())
            }
        ]);
    }, delay);
};

type handleScrollSignature = (key: string, delay?: number) => void;

export default handleSaveScrollPosition;
