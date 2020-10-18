export const PREV_ROUTE = "prev_route";

export function setDataInCookie(key: string, data: string): void {
    if (typeof window !== "undefined") {
        document.cookie = `${key}=${data}; path=/`;
    }
}

export function getDataFromCookie(key: string): string {
    if (typeof window !== "undefined") {
        const cookieArr = document.cookie.split(";");
        return cookieArr.find((cookie) => cookie.trim().startsWith(key));
    }
    return undefined;
}

export const getPreviousRoute = (): string => {
    const prevRoute = getDataFromCookie(PREV_ROUTE);
    if (prevRoute) {
        return prevRoute.split("=")[1];
    }
    return undefined;
};
