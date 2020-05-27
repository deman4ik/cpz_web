import { useEffect } from "react";
// types
import { displayType } from "components/ui/RobotPerformance/types";
// services
import WindowScrollService from "services/WindowScrollService";
import LocalStorageService from "services/localStorageService";
// utils
import handleSaveScrollPosition from "utils/handleSaveScrollPosition";

/**
 * Hoc  сохранения  позиции скролла и скроллинга к это  позиции
 * @param display - тип страницы
 */
const useSaveScroll = (key: string, deps?: any): void => {
    useEffect(() => {
        //обертка  подписки на события
        const scrollHandler = () => {
            handleSaveScrollPosition(key);
        };

        const scrollPosition: any = LocalStorageService.getItem(`${key}_scroll`);
        if (scrollPosition) {
            WindowScrollService.scrollTo(JSON.parse(scrollPosition));
        }
        WindowScrollService.subscribeToListenScroll(scrollHandler);

        return () => {
            WindowScrollService.unsubscribeListenScroll(scrollHandler);
        };
    }, [key, deps]);
};

export default useSaveScroll;
