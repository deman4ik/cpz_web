// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getDisplayName(Component) {
    return Component.displayName || Component.name || "Unknown";
}
