export function isNewPage() {
    if (typeof window !== "undefined") {
        return window.history.length <= 2;
    }
    return true;
}
