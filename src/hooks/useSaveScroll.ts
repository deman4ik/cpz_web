import { useEffect } from "react";
// services
import WindowScrollService from "services/WindowScrollService";
import LocalStorageService from "services/localStorageService";
// utils
import handleSaveScrollPosition from "utils/handleSaveScrollPosition";

/**
 * Hook  сохранения  позиции скролла и скроллинга к это  позиции
 * @param key - тип страницы и ключ для localstorage
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useSaveScroll = (key: string, loading?: any): void => {
    useEffect(() => {
        //обертка  подписки на события
        const scrollHandler = () => {
            handleSaveScrollPosition(key);
        };
        if (!loading) {
            const scrollPosition: any = LocalStorageService.getItem(`${key}_scroll`);
            if (scrollPosition) {
                WindowScrollService.scrollTo(JSON.parse(scrollPosition));
            }
            WindowScrollService.subscribeToListenScroll(scrollHandler);
        }

        return () => {
            WindowScrollService.unsubscribeListenScroll(scrollHandler);
        };
    });
};

export default useSaveScroll;
