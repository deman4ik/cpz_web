// constants
import { globalAny } from "../config/constants";

/**
 * Сервис  скродда окна (Тргерится только на ось)
 * @private window {any} - объект окна
 */
class WindowScrollService {
    private window: any;

    constructor() {
        this.window = globalAny.window;
    }

    /**
     *  Метод получение  текущего состояния скролла
     *  @return {scrollPositionsProps} - объект состояний скролла с координатами
     */
    getScrollPositions = (): scrollPositionsProps => {
        const positionX = this.window.scrollX;
        const positionY = this.window.scrollY;
        return { positionX, positionY };
    };

    /**
     *  Метод скролла окна к передаваемым коррдинатам
     * @param position {object}  - координаты по которым нужно совершить скролл
     * @return void
     */
    scrollTo = ({ positionX, positionY }: scrollPositionsProps): void => this.window.scrollTo(positionX, positionY);

    /**
     * Метод вешает обработчик на событие скролла окна
     * @param method {function} - передавемый обработчик
     */
    subscribeToListenScroll = (callback: any): void => {
        this.window.addEventListener("scroll", callback);
    };

    /**
     * Метод  удаляет обработчик со скролла окна
     * @param method {function} - передавемый обработчик
     */
    unsubscribeListenScroll = (method: any): void => this.window.removeEventListener("scroll", method);
}

/*types*/
export interface scrollPositionsProps {
    positionX: number;
    positionY: number;
}

export default new WindowScrollService();
